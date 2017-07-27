var jsdom = require('jsdom');
var fs = require('fs');
var snap_src = fs.readFileSync('./node_modules/snapsvg/dist/snap.svg-min.js', 'utf-8');
var request = require('request');

var config = {
  invokeUrl: process.env.ENDPOINT,
  apiKey: process.env.APIKEY
}

var templates = require('./templates/index.js');

function _error(res, msg) {
  console.log('__API_FAIL__');
  res.writeHead(404, {'Content-Type': 'text' });
  res.end(msg, 'utf-8');
  return false
}

function _success(res, body) {
  res.writeHead(200, {'Content-Type': 'image/svg+xml' });
  res.end(body, 'utf-8');
  return true
}

function draw (req, res, paper) {
  var tpl = templates[req.params.template];

  if (! tpl) {
    console.log('TEMPLATE_UNDEFINED:' + tpl);
    return _error(res, 'TEMPLATE_UNDEFINED')
  }

  options = {
    url: tpl.resource(config.invokeUrl, req.params),
    headers: {
      'Authorization': config.apiKey
    }
  }

  function _callback(error, response, body) {
    var result = undefined;

    if (error || response.statusCode != 200) {
      return _error(res, 'PROXY_FAIL')
    } 

    try {
      result = JSON.parse(body);
    }
    catch (err) {
      console.log(body)
      return _error(res, 'JSON_PARSE_ERROR')
    }

    tpl.render( paper, result );
    return _success(res, paper.toString())
  }

  request(options, _callback);
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

module.exports = { "handler": render }
