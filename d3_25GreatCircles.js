/**
 * Created by JianBo.Wang on 2018/8/7.
 */
d3.select("body").style("background-color", d3.rgb(60, 83, 88));

var svg = d3.select("svg");
var defs = svg.append("defs");

var group2 = svg.append("g").classed("group2", true);
var group1 = svg.append("g").classed("group1", true);

var ident_style = {
  "stroke": "#aeaeae",
  "stroke-width": 2,
  "fill": "none"
};

var red_stroke = "#FF2525";
var b_stroke = "#9C9AA2";
var c_stroke = "#243030";

group1.attr("transform", "translate(" + [259, 238] + ")");
group2.attr("transform", "translate(" + [259, 238] + ")");

var a = 106,
    edge = a * 2,
    current_angle = 0,
    start_coords = {x: 0, y: 0},
    coordinate_map = [],
    draw_ident_arrow = false;

if (draw_ident_arrow) {
  group1.append("path").attr("d", "M -20 0 20 0 M 0 -20 0 20")
    .style(ident_style)
    .classed("ident", true);
}

// i need absolute coordinates, but want to aquire them using relative polar coordinate movement
function relative_polar(relative_angle, distance) {
  current_angle += relative_angle;
  // to keep angles within 360 range
  if (current_angle >= 360) current_angle %= 360;
  if (current_angle < 0) current_angle = 360 - current_angle;
  // will return delta x y
  return {
    x: Math.cos(rad(current_angle)) * distance,
    y: -Math.sin(rad(current_angle)) * distance
  }
}

var polar_list = [
  // squares
  {a: 120, d: edge},
  {a: -90, d: edge},
  {a: 270, d: edge},
  {a: 60, d: edge},
  {a: 270, d: edge},
  {a: 270, d: edge},
  {a: 60, d: edge},
  {a: -90, d: edge},
  {a: -90, d: edge},
  // tris and inner
  {a: -90, d: 2*edge},
  {a: -240, d: edge},
  {a: 120, d: 3*edge},
  {a: -240, d: edge},
  {a: 120, d: 3*edge},
  {a: 120, d: edge}
];

function absolute_coords(start_coords, polar_list) {
  var current_coords = round_coords(strat_coords);
  var coord_list = [];

  coord_list.push(round_coords(start_coords));
  polar_list.forEach(function (item) {
    var rel_coord = relative_polar(item.a, item.b);
    rel_coord = round_coords(rel_coord);
    current_coords.x += rel_coord.x;
    current_coords.y += rel_coord.y;
    coord_list.push({x:current_coords.x, y:current_coords.y});
  })
  return coord_list;
}

function make_path(coord_list) {
  var path_string = "M ";
  coord_list.forEach(function (item) {
    path_string += (" " + [item.x, item.y].join(" "))
  })
  return path_string += "z"
}

var coord_list = absolute_coords(start_coords, polar_list);
var t_path = make_path(coord_list);

group1.append("path")
  .attr("d", t_path)
  .style(ident_style)
  .style("stroke", red_stroke);

// indexed clockwise
var quad_1 = [0, 1, 2, 3];
var quad_2 = [3, 4, 5, 6];
var quad_3 = [6, 7, 8, 9];
var tri_1 = [0, 3, 6];
var tri_2 = [10, 11, 3];
var tri_3 = [12, 13, 6];
var tri_4 = [14, 15, 0];

var quads = [quad_1, quad_2, quad_3];
var tris = [tri_1, tri_2, tri_3, tri_4];

function draw_edge(p1, p2, group, stroke) {
  var edge = "M " + [p1.x, p1.y, p2.x, p2.y].join(" ");
  group.append("path")
    .attr("d", edge)
    .style(ident_style)
    .style("stroke", stroke)
}

function poly_line(group, plist) {
  var ppath = make_path(plist);
  group.append("path").attr("d", ppath)
    .style(ident_style)
    .style("stroke", c_stroke)
}

// dumbo
function draw_quad_internals(quad) {
  // vertex points
  var v1 = coord_list[quad[0]],
      v2 = coord_list[quad[1]],
      v3 = coord_list[quad[2]],
      v4 = coord_list[quad[3]];
  // mid points
  var m1 = find_mid(v1, v2),
      m2 = find_mid(v2, v3),
      m3 = find_mid(v3, v4),
      m4 = find_mid(v4, v1);
  // mid lines
  draw_edge(m1, m3, group2, b_stroke);
  draw_edge(m2, m4, group2, b_stroke);
  // diagnoals
  draw_edge(v1, v3, group2, c_stroke);
  draw_edge(v2, v4, group2, c_stroke);
  // hectogram
  poly_line(group2, [v1, m2, v4, m1, v3, m4, v2, m3]);
}

quads.forEach(function (quad) {
  draw_quad_internals(quad);
});

// dumbo2
function draw_tri_internals(tri) {
  var v1 = coord_list[tri[0]],
      v2 = coord_list[tri[1]],
      v3 = coord_list[tri[2]];
  // mid points
  var m1 = find_mid(v1, v2),
      m2 = find_mid(v2, v3),
      m3 = find_mid(v3, v1);

  draw_edge(v1, m2, group2, b_stroke);
  draw_edge(v2, m3, group2, b_stroke);
  draw_edge(v3, m1, group2, b_stroke);

  poly_line(group2, [m1, m2, m3])
}

// helpers
function rad(deg) {
  return ((2 * Math.PI) / 360) * deg
}

function find_mid(c1, c2) {
  var x = (c1.x + c2.x) / 2;
  var y = (c1.y + c2.y) / 2;
  return {x: x, y: y}
}

function round_coords(c_in) {
  return {x: d3.round(c_in.x, 4), y: d3.round(c_in.y, 4)}
}


























