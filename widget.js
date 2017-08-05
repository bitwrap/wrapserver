var jsdom = require('jsdom');
var fs = require('fs');
var snap_src = fs.readFileSync('./node_modules/snapsvg/dist/snap.svg-min.js', 'utf-8');
var request = require('request');

var config = {
  endpoint: process.env.ENDPOINT,
  wrapserver: process.env.SVGENDPOINT,
  apikey: process.env.APIKEY
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

function draw (snap, req, res) {
  var tpl = templates[req.params.template];

  if (! tpl) {
    console.log('TEMPLATE_UNDEFINED:' + tpl);
    return _error(res, 'TEMPLATE_UNDEFINED')
  }

  options = {
    url: tpl.resource(config.endpoint, req.params),
    headers: {
      'Authorization': config.apikey
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
      console.log(body);
      return _error(res, 'JSON_PARSE_ERROR')
    }

    var paper = snap();
    tpl.render({
      'config': config, 
      'paper': paper, 
      'data': result,
      'request': request
    });
    return _success(res, paper.toString())
  }

  request(options, _callback);
}

function render(req, res) {

  jsdom.env({
    html: '',
    src: [ snap_src ],
    done: function (err, window) {
      // disallow loading external graphics
      window.Snap.load = undefined;
      draw(window.Snap, req, res);
      window.close();
    }
  });

}

module.exports = {
  "handler": render,
  "jsdom": jsdom,
  "request": request
}
