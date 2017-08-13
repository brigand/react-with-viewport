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

  const results = [];
  for (let i = 0; i < values.length; i += 1) {
    if (width < values[i].width) results.push(values[i]);
  }
  if (results.length === 0) {
    results.push(values[values.length - 1]);
  }
  return results;
}

module.exports = calcBreakpoint;

