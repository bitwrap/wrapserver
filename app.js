var express = require('express');
var app = express();
var jsdom = require('jsdom');
var request = require('request');

var fs = require('fs');
var snap_src = fs.readFileSync('./node_modules/snapsvg/dist/snap.svg-min.js', 'utf-8');

var templates = {
  machine: require('./lib/machine.js'),
  counter: require('./lib/counter.js')
}

function render(paper, req) {
  var tpl = templates[req.params.template];

  if (! tpl) {
    return false
  }

  return tpl(
    paper,
    { query: req.query, params: req.params, body: req.body }
  );
}

function abort(res) {
  res.writeHead(404, {'Content-Type': 'image/svg+xml' });
  res.end('', 'utf-8');
}

app.get('/:template/:oid.svg', function (req, res) {

  var uri = 'http://127.0.0.1:8080/' + req.params.template + '/' + req.params.oid + '.json';

  request(uri, function (error, response, body) {
    if (error || response.statusCode != 200) {
      abort(res);
    } else {
      data = JSON.parse(body);

      jsdom.env( '', // empty body
        [], // no external scripts 
        { src: [ snap_src ] },
        function (err, window) {
          var paper = new window.Snap();
          req['body'] = data;

          if (false !== render(paper, req)) {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(paper.toString(), 'utf-8');
          } else {
            abort(res);
          }

          window.close();
      });
    }
  });

})

app.listen(8000, function () {
    console.log('listening on port 8000')
})
