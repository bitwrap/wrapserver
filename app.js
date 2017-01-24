var express = require('express');
var app = express();
var jsdom = require('jsdom');
var fs = require("fs");
var snap_src = fs.readFileSync("./node_modules/snapsvg/dist/snap.svg-min.js", "utf-8");


app.get('/', function (req, res) {

    jsdom.env( '', // empty body
      [], // no external scripts 
      { "src": [ snap_src ] },
      function (err, window) {
        var paper = new window.Snap().svg()

        paper
          .circle(100, 100, 50)
          .attr({
            id: 'foo',
            fill: '#facade',
            stroke: '#000',
            strokeWidth: 2,
            class: 'place'
          });

        paper
          .rect(90, 90, 20, 20, 3)
          .attr({
             fill: '#000',
             stroke: 'none'
          });

        res.writeHead(200, {'Content-Type': 'image/svg+xml' });
        res.end(paper.toString(), 'utf-8');
        window.close()
      }
    );
})

app.listen(8000, function () {
    console.log('listening on port 8000')
})
