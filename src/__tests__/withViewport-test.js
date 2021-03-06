const React = require('react');
const { mount } = require('enzyme');
const withViewport = require('../withViewport');

const examplePoints = {
  mobile: { width: 400 },
  tablet: { width: 800 },
  desktop: { width: 1200 },
};

const resize = (width, height = 1024) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
};

it(`doesn't error`, () => {
  const C = () => <div />;
  const W = withViewport({})(C);
  mount(<W />);
  // no params, just for coverage
  const W2 = withViewport()(C);
  mount(<W2 />);
});

it(`unmounts correctly`, () => {
  const C = () => <div />;
  const W = withViewport({})(C);
  const x = mount(<W />);
  const inst = x.instance();
  const spy = jest.fn();
  inst.doUpdate = spy;
  resize(500);
  expect(spy).toHaveBeenCalledTimes(1);
  resize(500);
  expect(spy).toHaveBeenCalledTimes(2);
  x.unmount();
  resize(500);
  expect(spy).toHaveBeenCalledTimes(2);
});

it(`handles resize`, () => {
  const C = () => <div />;
  const W = withViewport({})(C);
  const x = mount(<W />);
  expect(x.state().renders).toBe(0);
  resize(100, 100);
  expect(x.state().renders).toBe(1);
});

it(`gives correct breakpoints`, () => {
  resize(500);
  const C = () => <div />;
  const W = withViewport({ breakPoints: examplePoints })(C);
  const x = mount(<W />);
  const getBreakpoint = () => x.find(C).props().breakPoint;
  expect(getBreakpoint()).toMatchObject({ width: 800, key: 'tablet'});
  resize(1000);
  expect(getBreakpoint()).toMatchObject({ width: 1200, key: 'desktop'});
});

function prepareRelative() {
  resize(100);
  const C = () => <div />;
  const W = withViewport({ breakPoints: examplePoints })(C);
  const x = mount(<W />);
  const getBreakpoint = () => x.find(C).props().breakPoint;
  return getBreakpoint;
}

it(`breakPoint.isLte`, () => {
  const getBreakpoint = prepareRelative();
  let bp = getBreakpoint();

  expect(bp.isLte('mobile')).toBe(true);
  expect(bp.isLte('tablet')).toBe(true);
  expect(bp.isLte('desktop')).toBe(true);

  resize(500);
  bp = getBreakpoint();
  expect(bp.isLte('mobile')).toBe(false);
  expect(bp.isLte('tablet')).toBe(true);
  expect(bp.isLte('desktop')).toBe(true);
});

it(`breakPoint.isLt`, () => {
  const getBreakpoint = prepareRelative();
  let bp = getBreakpoint();

  expect(bp.isLt('mobile')).toBe(false);
  expect(bp.isLt('tablet')).toBe(true);
  expect(bp.isLt('desktop')).toBe(true);

  resize(500);
  bp = getBreakpoint();
  expect(bp.isLt('mobile')).toBe(false);
  expect(bp.isLt('tablet')).toBe(false);
  expect(bp.isLt('desktop')).toBe(true);
});

it(`breakPoint.isGte`, () => {
  const getBreakpoint = prepareRelative();
  let bp = getBreakpoint();

  expect(bp.isGte('mobile')).toBe(true);
  expect(bp.isGte('tablet')).toBe(false);
  expect(bp.isGte('desktop')).toBe(false);

  resize(500);
  bp = getBreakpoint();
  expect(bp.isGte('mobile')).toBe(true);
  expect(bp.isGte('tablet')).toBe(true);
  expect(bp.isGte('desktop')).toBe(false);
});

it(`breakPoint.isGt`, () => {
  const getBreakpoint = prepareRelative();
  let bp = getBreakpoint();

  expect(bp.isGt('mobile')).toBe(false);
  expect(bp.isGt('tablet')).toBe(false);
  expect(bp.isGt('desktop')).toBe(false);

  resize(500);
  bp = getBreakpoint();
  expect(bp.isGt('mobile')).toBe(true);
  expect(bp.isGt('tablet')).toBe(false);
  expect(bp.isGt('desktop')).toBe(false);
});





it(`doesn't update if breakpoint hasn't changed`, () => {
  resize(500);
  const C = () => <div />;
  const W = withViewport({ breakPoints: examplePoints })(C);
  const x = mount(<W />);
  const getWidth = () => x.find(C).props().width;
  expect(getWidth()).toBe(500);
  resize(501);
  expect(getWidth()).toBe(500);
});

it(`reports width and height`, () => {
  resize(500, 300);
  const C = () => <div />;
  const W = withViewport({})(C);
  const x = mount(<W />);
  expect(x.find(C).props().width).toBe(500);
  expect(x.find(C).props().height).toBe(300);
  resize(1000, 500);
  expect(x.find(C).props().width).toBe(1000);
  expect(x.find(C).props().height).toBe(500);
});

it(`works with throttle`, () => {
  resize(200, 100);
  const C = () => <div />;
  const W = withViewport({ throttle: 20 })(C);
  const x = mount(<W />);
  resize(500, 300);
  expect(x.find(C).props().width).toBe(200);
  return new Promise((resolve) => setTimeout(resolve, 40))
    .then(() => {
      expect(x.find(C).props().width).toBe(500);
    });
});

