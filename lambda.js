var widget = require('./widget.js')
var endpoint = process.env.ENDPOINT;

exports.handler = (event, context, callback) => {
    var response = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text',
            'Access-Control-Allow-Origin': '*'
        }
    }

    var req = {
        // TODO: actually use the event
        'params':  { 'template': 'octoe', 'oid': '000000000' }
    }

    var res = {
        'writeHead': (status, headers) => {
        },
        'end': (data, encoding) => {
          response['body'] = data
        }
    }
    
    widget.handler(req, res);
    callback(null, response);
}
