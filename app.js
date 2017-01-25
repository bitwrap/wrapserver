var express = require('express');
var app = express();
var jsdom = require('jsdom');
var fs = require('fs');
var snap_src = fs.readFileSync('./node_modules/snapsvg/dist/snap.svg-min.js', 'utf-8');

var templates = {
  bitwrap: require('./lib/bitwrap.js'),
  counter: require('./lib/counter.js')
}

function render(paper, req) {

  var tpl = templates[req.params.template];

  if (! tpl) {
    return false
  }

  console.log({
    query: req.query,
    params: req.params
  });

  return tpl.render(
    paper,
    { query: req.query, params: req.params }
  );
}

app.get('/:template/:oid.svg', function (req, res) {

  jsdom.env( '', // empty body
    [], // no external scripts 
    { src: [ snap_src ] },
    function (err, window) {
      var paper = new window.Snap();
      var _tpl = req.params.template;

      if (false !== render(paper, req)) {
        res.writeHead(200, {'Content-Type': 'image/svg+xml' });
        res.end(paper.toString(), 'utf-8');
      } else {
        res.writeHead(404, {'Content-Type': 'image/svg+xml' });
        res.end('', 'utf-8');
      }

      window.close();
    }
  );
})

app.listen(8000, function () {
    console.log('listening on port 8000')
})
