const calcBreakpoint = require('../calcBreakpoint');

const examplePoints = {
  mobile: { width: 400 },
  tablet: { width: 800 },
  desktop: { width: 1200 },
};

const results = Object.keys(examplePoints).reduce((acc, key) => {
  acc[key] = Object.assign({}, examplePoints[key], { key });
  return acc;
}, {});

it(`works`, () => {
  expect(calcBreakpoint(results, 200)).toEqual([
    results.mobile,
    results.tablet,
    results.desktop,
  ]);
  expect(calcBreakpoint(results, 500)).toEqual([
    results.tablet,
    results.desktop,
  ]);
  expect(calcBreakpoint(results, 1000)).toEqual([
    results.desktop,
  ]);
  expect(calcBreakpoint(results, 1600)).toEqual([
    results.desktop,
  ]);
  expect(calcBreakpoint(results, 1000000)).toEqual([
    results.desktop,
  ]);


});

