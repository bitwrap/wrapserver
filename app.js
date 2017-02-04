var express = require('express');
var app = express();
var jsdom = require('jsdom');
var request = require('request');
var templates = require('./templates/index.js');
var fs = require('fs');
var snap_src = fs.readFileSync('./node_modules/snapsvg/dist/snap.svg-min.js', 'utf-8');

var backend = process.env.BITWRAP_PORT_8080_TCP_ADDR;
var endpoint = process.env.ENDPOINT;

if (! backend ) {
  backend  = '127.0.0.1';
}

if (! endpoint ) {
  endpoint  = 'http://127.0.0.1:8080';
}

function render(paper, req) {
  var tpl = templates[req.params.template];

  if (! tpl) {
    return false;
  }

  return tpl.render(
    paper,
    { query: req.query, params: req.params, body: req.body }
  );
}

function abort(res) {
  res.writeHead(404, {'Content-Type': 'image/svg+xml' });
  res.end('', 'utf-8');
}

function add_cors(res, path, stat) {
  res.setHeader('Access-Control-Allow-Origin', '*');
}

app.get('/config/:stage.json', function (req, res) {
  add_cors(res);
  res.writeHead(200, {'Content-Type': 'application/json' });
  cfg = {
    'endpoint': endpoint,
    'wrapserver': '',
    'stage': req.params.stage
  };

  res.end(JSON.stringify(cfg), 'utf-8');
})

app.get('/:template/:oid.svg', function (req, res) {
  var tpl = templates[req.params.template];

  var uri = 'http://' + backend + ':8080' + tpl.resource(req.params.template, req.params.oid);

  request(uri, function (error, response, body) {
    add_cors(res);

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

app.use('/', express.static(__dirname, { 'setHeaders': add_cors }))

app.listen(8000, function () {
    console.log('listening on port 8000')
})
