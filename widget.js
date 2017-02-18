var jsdom = require('jsdom');
var fs = require('fs');
var snap_src = fs.readFileSync('./node_modules/snapsvg/dist/snap.svg-min.js', 'utf-8');
var apig = require('aws-api-gateway-client')

var templates = require('./templates/index.js');

var config = {
  'invokeUrl': process.env.APIENDPOINT,
  'apiKey': process.env.APIKEY
}

var client = apig.newClient(config)

function abort(res) {
  res.writeHead(404, {'Content-Type': 'image/svg+xml' });
  res.end('', 'utf-8');
}

function _render (paper, req) {
  var tpl = templates[req.params.template];
  if (! tpl) {
    return false;
  }

  req.body = {} // TODO: get upstream data

  return tpl.render(
    paper,
    { query: req.query, params: req.params, body: req.body }
  );
}

function render(req, res) {
  jsdom.env( '', // empty body
    [], // no external scripts 
    { src: [ snap_src ] },
    function (err, window) {
      var paper = new window.Snap();

      if (false !== _render(paper, req)) {
        res.writeHead(200, {'Content-Type': 'image/svg+xml' });
        res.end(paper.toString(), 'utf-8');
      } else {
        abort(res);
      }

      window.close();
  });
}

module.exports = { "handler": render }
