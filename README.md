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


## Breakpoints

With breakpoints, your component receives new props when the viewport passes a threshold.

```jsx
withViewport({
  breakpoints: {
    mobile: { width: 0 },
    tablet: { width: 720 },
    desktop: { width: 1200 },
    large: { width: 1620 },
  }
})
```

These are the lower bounds, so if the width is 500, then it'll be the 'mobile' breakpoint.

## Contributing

If you're making significant changes, please create an issue first.

Clone the repo and run `yarn` or `npm install`.

To run tests: `npm test` or `npm test -- --watch`. Please keep coverage at 100%.

