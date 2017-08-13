[![build status](https://img.shields.io/travis/brigand/react-with-viewport/master.svg?style=flat-square)](https://travis-ci.org/brigand/react-with-viewport)
[![Coverage Status](https://coveralls.io/repos/github/brigand/react-with-viewport/badge.svg?branch=master)](https://coveralls.io/github/brigand/react-with-viewport?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/react-with-viewport.svg?style=flat-square)](https://www.npmjs.com/package/react-with-viewport)
[![Dependency Status](https://img.shields.io/david/brigand/react-with-viewport.svg?style=flat-square)](https://david-dm.org/brigand/react-with-viewport)


This high order component provides the viewport size to the child in an efficient ways.

It has two primary modes: exact size, and breakpoints.

## Exact size

This is the simplest mode, but will often give you more precision and extra renders than desired.

```jsx
import withViewport from 'react-with-viewport';

export default withViewport()(props => {
  return <div>Width: {props.width}, Height: {props.height}</div>
});
```

You can pass a throttle timeout: `withViewport({ throttle: 500 })`.

If your component takes props named 'width', 'height', or 'breakPoint', you can rename the props passed by withViewport: `withViewport({ props: ['viewWidth', 'viewHeight', 'bp' ] })`.

Props passed:

<!-- http://www.tablesgenerator.com/markdown_tables -->

| prop   | description         |
|--------|---------------------|
| width  | the viewport width  |
| height | the viewport height |

## Breakpoints

With breakpoints, your component receives new props when the viewport passes a threshold.

```jsx
withViewport({
  breakpoints: {
    mobile: { width: 480 },
    tablet: { width: 720 },
    desktop: { width: 1200 },
    large: { width: 1620 },
  }
})
```

Props passed:

| prop             | description                                                              |
|------------------|--------------------------------------------------------------------------|
| width            | the viewport width                                                       |
| height           | the viewport height                                                      |
| breakPoint.key   | the key of the breakPoints object that matched                           |
| breakPoint.width | the width specified in the breakPoint object                             |
| breakPoint.isLt  | function that checks if the breakPoint is smaller than the specified key |
| breakPoint.isLte | see above                                                                |
| breakPoint.isGt  | see above                                                                |
| breakPoint.isGte | see above                                                                |

These are the upper bounds, so if the width is 200, then it'll be the 'mobile' breakpoint. If it's larger than the highest breakpoint, it'll be that breakpoint.

### Relative operators

The `breakPoint` prop has methods on it for determining if e.g. the current breakPoint is less-than-or-equal-to 'mobile'.

```js
this.props.breakPoint.isLte('tablet') // returns true or false
```

The available methods are `isLt`, `isLte`, `isGt`, `isGte`.

To check for exact equality use: `this.props.breakPoint.key === 'mobile'`.

## Contributing

If you're making significant changes, please create an issue first.

Clone the repo and run `yarn` or `npm install`.

To run tests: `npm test` or `npm test -- --watch`. Please keep coverage at 100%.

