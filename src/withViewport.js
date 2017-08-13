const React = require('react');
const throttle = require('lodash/throttle');
const calcBreakpoint = require('./calcBreakpoint');

function withViewport(params = {}) {
  function withViewportHOC(Component) {
    class ViewportContainer extends React.Component {
      constructor(props) {
        super();
        this.state = {renders: 0};
        this.lastBreakpoint = null;
        this.doUpdate = this.doUpdate.bind(this);
        if (params.throttle) {
          this.doUpdate = throttle(this.doUpdate, params.throttle, {
            leading: false,
            trailing: true,
          });
        }
      }
      getProps() {
        const { width, height } = this.getViewport();
        const breakPoint = this.getBreakpoint();
        let props = Object.assign(
          [ 'width', 'height', 'breakPoint' ],
          params.props
        );
        return {
          [props[0]]: width,
          [props[1]]: height,
          [props[2]]: breakPoint,
        };
      }
      getBreakpoint() {
        if (!params.breakPoints) {
          return null;
        }
        const breakPoints = calcBreakpoint(
          params.breakPoints,
          this.getViewport().width,
        );
        const res = {
          matches: breakPoints,
          isLte(key) {
            return breakPoints.findIndex(x => x.key === key) !== -1;
          },
          isLt(key) {
            return res.isLte(key) && breakPoints[0].key !== key;
          },
          isGte(key) {
            return !res.isLt(key);
          },
          isGt(key) {
            return !res.isLte(key);
          },
        };
        Object.assign(res, breakPoints[0]);
        return res;
      }
      getViewport() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return { width, height };
      }

      // this is maybe throttled
      doUpdate() {
        this.setState({ renders: this.state.renders + 1 });
      }
      componentDidMount() {
        const onResize = () => {
          if (params.breakPoints) {
            const breakPoint = this.getBreakpoint();
            if (breakPoint
              && (!this.lastBreakpoint
              || breakPoint.key !== this.lastBreakpoint.key)) {
              this.lastBreakpoint = breakPoint;
              this.doUpdate();
            }
          } else {
            this.doUpdate();
          }
        };

        const initialBreakPoint = this.getBreakpoint();
        this.lastBreakpoint = initialBreakPoint;
        window.addEventListener('resize', onResize);
        this.cleanUp = () => window.removeEventListener('resize', onResize);
      }
      componentWillUnmount() {
        this.cleanUp();
      }
      render() {
        const props = Object.assign(
          {},
          this.props,
          this.getProps()
        );
        return React.createElement(Component, props);
      }
    }
    return ViewportContainer;
  }

  return withViewportHOC;
}

module.exports = withViewport;

