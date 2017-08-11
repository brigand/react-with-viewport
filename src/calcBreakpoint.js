const sortBy = require('lodash/sortBy');

function calcBreakpoint(breakpoints, width) {
  const keys = sortBy(
    Object.keys(breakpoints),
    (key) => breakpoints[key].width,
  );
  const values = keys.map((key) => Object.assign(
    {},
    breakpoints[key],
    { key }
  ));

  for (let i = 0; i < values.length; i += 1) {
    if (width < values[i].width) return values[i];
  }
  return values[values.length - 1];
}

module.exports = calcBreakpoint;

