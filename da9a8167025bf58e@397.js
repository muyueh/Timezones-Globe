import define1 from "./f69f0d836059a035@761.js";

function _1(md){return(
md`# Timezones Globe`
)}

function _longitude(){return(
5
)}

function _latitude(){return(
46
)}

function* _4(d3,size,styles,graticule,countries,zones,color,path,projection)
{
  const svg = d3
    .create("svg")
    .attr("class", "globe")
    .attr("width", size)
    .attr("height", size);

  svg.append("style").html(styles);

  const sphere = svg
    .append("path")
    .datum({ type: "Sphere" })
    .attr("class", "sphere");

  const graticulePath = svg
    .append("path")
    .datum(graticule)
    .attr("class", "graticule");

  const countriesPath = svg
    .selectAll(".country")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country");

  const zonesPath = svg
    .selectAll(".zone")
    .data(zones.features)
    .enter()
    .append("path")
    .attr("class", "zone")
    .attr("fill", (d) => color(d.properties.minutes_offset))
    .attr("d", path)
    .append("title")
    .text((d) => `${d.properties.utc_offset}`);

  svg.call(
    d3
      .drag()
      .on("start", () => {
        const [lambda, phi, gamma = 0] = projection.rotate();
        svg.property("__rotation__", { lambda, phi, gamma });
      })
      .on("drag", (event) => {
        const start = svg.property("__rotation__") || { lambda: 0, phi: 0, gamma: 0 };
        const rotate = [start.lambda + event.dx * 0.5, start.phi - event.dy * 0.5, start.gamma];
        rotate[1] = Math.max(-90, Math.min(90, rotate[1]));
        projection.rotate(rotate);
        render();
      })
  );

  function render() {
    sphere.attr("d", path);
    graticulePath.attr("d", path);
    countriesPath.attr("d", path);
    zonesPath.attr("d", path);
  }

  yield svg.node();
  render();
}


function _5(md){return(
md`Inspo : [@mbostock/time-zones](https://observablehq.com/@mbostock/time-zones)

Use [evansiroky/timezone-boundary-builder](https://github.com/evansiroky/timezone-boundary-builder) for the boundaries of the zones.

[IANA time zones database](https://www.iana.org/time-zones)`
)}

function _6(md){return(
md`## Technical
The latest [2025b release](https://github.com/evansiroky/timezone-boundary-builder/releases/tag/2025b) of [evansiroky/timezone-boundary-builder](https://github.com/evansiroky/timezone-boundary-builder) returns 444 different timezones. This is too much to load, and we need a script to merge these zones based on their UTC-offset.

The timezones were listed in [timezone-names.json](https://github.com/evansiroky/timezone-boundary-builder/releases/download/2025b/timezone-names.json). I wrote a basic script (based on this [stackoverflow solution](https://stackoverflow.com/a/68593283)) to compute the current UTC offset (as of 23rd of September 2025) and associate it to each timezone in a CSV file.

Using [mapshaper](https://mapshaper.org/) and the tutorial [Join spreadsheet data with polygon map](https://handsondataviz.org/mapshaper.html#join-spreadsheet-data-with-polygon-map), I associated the UTC offset to each area and merged the 444 timezones into 38 geometric features :
\`\`\`
$ -join timezones_offsets keys=tzid,tzid
$ -dissolve fields=utc_offset,minutes_offset
\`\`\``
)}

function _7(md){return(
md`## Data`
)}

function _land(topojson,world){return(
topojson.feature(world, world.objects.land)
)}

function _countries(topojson,world){return(
topojson.feature(world, world.objects.countries)
)}

function _world(d3){return(
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
)}

function _graticule(d3){return(
d3.geoGraticule10()
)}

function _12(md){return(
md`## Dimensions`
)}

function _size(width){return(
Math.min(600, width)
)}

function _14(md){return(
md`## Geo`
)}

function _projection(d3,size,longitude,latitude){return(
d3
  .geoOrthographic()
  .fitSize([size, size], { type: "Sphere" })
  .rotate([-longitude, -latitude])
)}

function _path(d3,projection){return(
d3.geoPath(projection)
)}

function _17(md){return(
md`## Styles`
)}

function _styles(){return(
`
.globe {
  display: table;
  margin: 0 auto;
  overflow: visible;
}
.sphere {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
.country {
  fill: #464646;
  stroke: #ccc;
  stroke-linejoin: round;
}
.graticule {
  fill: none;
  stroke: #aaa;
  stroke-opacity: 0.15;
}
.zone {
  fill-opacity: 0.7
}
`
)}

function _19(md){return(
md`### Color scale
We would like to reproduce the color scale of [Time Zone Map](https://www.timeanddate.com/time/map/).`
)}

function _base_colors(){return(
["#fb8d59", "#fde090", "#a8d696", "#7dbdd1", "#ab8ac1", "#ed6362"]
)}

function _color_interpolator(d3,base_colors){return(
d3.interpolateRgbBasisClosed(base_colors)
)}

function _22(ramp,color_interpolator){return(
ramp(color_interpolator)
)}

function _color(d3,color_interpolator){return(
d3.scaleSequential([0, 300], color_interpolator)
)}

function _24(md){return(
md`## Imports`
)}

function _timezones(FileAttachment){return(
FileAttachment("timezones@2.json").json()
)}

function _zones(topojson,timezones){return(
topojson.feature(timezones, timezones.objects.timezones2)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["timezones@2.json", {url: new URL("./files/012f906dc07fd64e6851f959501c5bfc46eccda1b588bc0a1ab6735b7dcf872d657096f592f461ef3713fdeb7ef35d653a383c67653adb26357b9b6cb0b45f1b.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("longitude")).define("longitude", _longitude);
  main.variable(observer("latitude")).define("latitude", _latitude);
  main.variable(observer()).define(["d3","size","styles","graticule","countries","zones","color","path","projection"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("land")).define("land", ["topojson","world"], _land);
  main.variable(observer("countries")).define("countries", ["topojson","world"], _countries);
  main.variable(observer("world")).define("world", ["d3"], _world);
  main.variable(observer("graticule")).define("graticule", ["d3"], _graticule);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("size")).define("size", ["width"], _size);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("projection")).define("projection", ["d3","size","longitude","latitude"], _projection);
  main.variable(observer("path")).define("path", ["d3","projection"], _path);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("styles")).define("styles", _styles);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("base_colors")).define("base_colors", _base_colors);
  main.variable(observer("color_interpolator")).define("color_interpolator", ["d3","base_colors"], _color_interpolator);
  main.variable(observer()).define(["ramp","color_interpolator"], _22);
  main.variable(observer("color")).define("color", ["d3","color_interpolator"], _color);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("timezones")).define("timezones", ["FileAttachment"], _timezones);
  main.variable(observer("zones")).define("zones", ["topojson","timezones"], _zones);
  const child1 = runtime.module(define1);
  main.import("ramp", child1);
  return main;
}
