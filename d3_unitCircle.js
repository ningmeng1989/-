/**
 * Created by JianBo.Wang on 2018/8/7.
 */
var svg = d3.select("svg");

var cx = 95;
var cy = 403;
var linewidth = 200;

var samples = 115;

var xoffset = 50;
var yoffset = -48;

var eqns = [
  {
    a: 50,
    fn: Math.sin,
    freq: 1
  },
  {
    a: 50,
    fn: Math.cos,
    freq: 1
  }
];

tributary.duration = 5000;

var linescale = d3.scale.linear().domain([0, samples]).range([0, linewidth]);

var waveline = d3.svg.line()
  .x(function (d) {
    return d.x
  })
  .y(function (d) {
    return d.y
  });
// these 3 lines set stuff up using functions at the bottom
var sin = trig(eqns[0]);
var cos = trig(eqns[1]);
var line = lineFn();

// generate data for our circle using the funcitons
var ydata = sample(sin, {start: 0, end: 2 * Math.PI, n: samples});
var xdata = sample(cos, {start: 0, end: 2 * Math.PI, n: samples});
var data = ydata.map(function (d, i) {
  return {
    x: xdata[i] + cx,
    y: ydata[i] + cy
  }
});

var cosdata = xSample(0);
var sindata = ySample(0);
// draw unit circle
var circle = svg.append("path")
  .datum(data)
  .attr("d", line)
  .classed("unit", true);

// make a particle that traces out the unit circle
var particle = svg.append("circle")
  .attr("r", 5)
  .classed("particle", true);

var xparticle = svg.append("circle")
  .attr("r", 5)
  .classed("particle", true)
  .classed("xparticle", true);

var yparticle = svg.append("circle")
  .attr("r", 5)
  .classed("particle", true)
  .classed("yparticle", true);

var cosline = svg.append("path")
  .datum(cosdata)
  .attr("d", waveline)
  .classed("line", true);
var sinline = svg.append("path")
  .datum(sindata)
  .attr("d", waveline)
  .classed("line", true);

// move the particle around the unit circle
tributary.run = function (g, t) {
  var theta = (t + 0.0001) * 2 * Math.PI;

  particle.attr({
    cx: cos(theta) + cx,
    cy: sin(theta) + cy
  })
  xparticle.attr({
    cx: cos(theta) + cx,
    cy: 0 + cy - eqns[0].a + yoffset
  })
  yparticle.attr({
    cx: 0 + cx + eqns[1].a + xoffset,
    cy: sin(theta) + cy
  })

  cosdata = xSample(theta);
  cosline.datum(cosdata)
    .attr("d", waveline);

  sindata = ySample(theta);
  sinline.datum(sindata)
    .attr("d", waveline);
};

function xSample(t) {
  return sample(cos, {start: t+2*Math.PI, end: t, n: samples})
    .map(function (d, i) {
      return {
        x: d + cx,
        y: -linescale(i) + cy + yoffset - eqns[0].a
      }
    })
}
function ySample(t) {
  return sample(sin, {start: t+2*Math.PI, end: t, n: samples})
    .map(function (d, i) {
      return {
        x: linescale(i) + cx + xoffset + eqns[1].a,
        y: d + cy
      }
    })
}

// opts = {
//   start: x0, start of x domain
//   end: x1, start of y domain
//   n: number of samples
// }
function sample(y, opts) {
  if (!opts) opts = {};
  var start = opts.start || 0;
  var end = opts.end || 1;
  var n = opts.n || 50;
  var step = (end - start) / n;
  var data = d3.range(n);
  return data.map(function (i) {
    return y(start + i*step)
  })
}

// make a trig funciton from an object
function trig(eqn) {
  var fn = function (t) {
    return eqn.a * eqn.fn(t * eqn.freq)
  }
  return fn
}
// generate line fn
function lineFn() {
  var line =  d3.svg.line()
    .x(function (d) {
      return d.x
    })
    .y(function (d) {
      return d.y
    })
    .interpolate("line-closed");
  return line
}


































