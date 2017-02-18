var express = require('express');
var app = express();
var widget = require('./widget.js')
var endpoint = process.env.ENDPOINT;

function add_cors(res, path, stat) {
  res.setHeader('Access-Control-Allow-Origin', '*');
}

app.get('/config/:stage.json', function (req, res) {
  widget.handler(req, res)
  cfg = {
    'endpoint': endpoint,
    'wrapserver': '',
    'stage': req.params.stage
  };

})

app.get('/:template/:oid.svg', function (req, res) {
  add_cors(res);
  widget.handler(req, res)
})

app.use('/', express.static(__dirname, { 'setHeaders': add_cors }))

app.listen(8000, function () {
    console.log('listening on port 8000')
})
