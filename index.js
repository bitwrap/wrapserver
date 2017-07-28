var widget = require('./widget.js')
var endpoint = process.env.ENDPOINT;

exports.handler = (event, context, callback) => {
    var svgdata;

    var req = {
        // TODO: actually use the event data
        'params':  { 'template': 'octoe', 'oid': '000000000' }
    }

    var res = {
        'writeHead': (status, headers) => {
            //pass
        },
        'end': (data, encoding) => {

            var response = {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'image/svg+xml'
                },
                'body': data 
            }

            callback(null, response);
        }
    }


    widget.handler(req, res);
}

exports.test = () => {
  exports.handler({}, {}, (_, data) => {
      console.log(data)
    }
  )
}
