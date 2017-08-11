const calcBreakpoint = require('../calcBreakpoint');

const examplePoints = {
  mobile: { width: 400 },
  tablet: { width: 800 },
  desktop: { width: 1200 },
};

it(`works`, () => {
  expect(calcBreakpoint(examplePoints, 200)).toEqual({ key: 'mobile', width: 400 });
  expect(calcBreakpoint(examplePoints, 500)).toEqual({ key: 'tablet', width: 800 });
  expect(calcBreakpoint(examplePoints, 1000)).toEqual({ key: 'desktop', width: 1200 });
  expect(calcBreakpoint(examplePoints, 1600)).toEqual({ key: 'desktop', width: 1200 });
});

