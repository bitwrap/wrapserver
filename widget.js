var jsdom = require('jsdom');
var fs = require('fs');
var snap_src = fs.readFileSync('./node_modules/snapsvg/dist/snap.svg-min.js', 'utf-8');
var request = require('request');

var config = {
  invokeUrl: process.env.APIENDPOINT,
  apiKey: process.env.APIKEY
}

var client = require('aws-api-gateway-client').newClient(config)
var templates = require('./templates/index.js');

function draw (req, res, paper) {

  var tpl = templates[req.params.template];
  if (! tpl) { return false; }

  console.log(req.params);

  options = {
    url: tpl.resource(config.invokeUrl, req.params),
    headers: {
      'Authorization': config.apiKey
    }
  }

  function callback(error, response, body) {
    result = JSON.parse(body)

    if (error || response.statusCode != 200) {
      console.log('__API_FAIL__');
      res.writeHead(404, {'Content-Type': 'image/svg+xml' });
      res.end('', 'utf-8');
    } else {
      tpl.render( paper, { query: req.query, params: req.params, body: result });
      res.writeHead(200, {'Content-Type': 'image/svg+xml' });
      res.end(paper.toString(), 'utf-8');
    }
  }

  request(options, callback)
}

function render(req, res) {

  jsdom.env( '', // empty body
    [], // no external scripts 
    { src: [ snap_src ] },
    function (err, window) {
      var paper = new window.Snap();
      draw(req, res, paper);
      window.close();
  });
}

module.exports = { "handler": render, "api": client }
