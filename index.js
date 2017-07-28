var widget = require('./widget.js')
var endpoint = process.env.ENDPOINT;

exports.handler = (event, context, callback) => {

    var req = {
        'params':  {
            'template': event.pathParameters.template,
            'oid': event.pathParameters.oid.replace(/\.svg$/, '')
        }
    }

    var res = {
        'writeHead': (status, headers) => {
            //pass use by express only
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

// invoke the test function
exports.test = () => {
  var evt = { 'pathParameters': { 'template': 'octoe', 'oid': '000000000.svg' }}
  var ctx = {}

  exports.handler(evt, ctx, (_, data) => {
      console.log(data)
    }
  )
}
