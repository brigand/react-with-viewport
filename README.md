
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

If your component takes props named 'width', 'height', or 'breakPoint', you can rename the props passed by withViewport: `withViewport({ props: ['viewWidth', 'viewHeight', 'bp' ] });


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


