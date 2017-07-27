var express = require('express');
var app = express();
var widget = require('./widget.js')
var endpoint = process.env.ENDPOINT;

function add_cors(res, path, stat) {
  res.setHeader('Access-Control-Allow-Origin', '*');
}

app.get('/config/:stage.json', function (req, res) {
  add_cors(res);
  res.writeHead(200, {'Content-Type': 'application/json' });
  cfg = {
    'endpoint': endpoint,
    'stage': req.params.stage
  };

  res.end(JSON.stringify(cfg), 'utf-8');
})

app.get('/:template/:oid.svg', function (req, res) {
  add_cors(res);
  widget.handler(req, res)
})

app.use('/', express.static(__dirname, { 'setHeaders': add_cors }))

app.listen(8000, function () {
    console.log('listening on http://127.0.0.1:8000')
})
