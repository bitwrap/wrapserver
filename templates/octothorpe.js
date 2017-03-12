var size = 40;

function draw_x(paper, coords) {
  var factor = size
  var x = coords[1] * size * 2 + size/2;
  var y = coords[0] * size * 2 + size/2;

  paper
    .polyline(
      x + size   , y + size,
      x          , y,
      x + size/2 , y + size/2,
      x          , y + size,
      x + size   , y 
    ).attr({
        'id': 'PIECE-' + coords[0] + coords[1],
        'class': 'EX',
        'fill-opacity': '0',
        'stroke': '#000',
        'strokeWidth': 5
    });
}

function draw_o(paper, coords) {
  var x = coords[1] * size * 2 + size;
  var y = coords[0] * size * 2 + size;

  paper
    .circle({
      'cx': x,
      'cy': y,
      'r': (size/2)
    }).attr({
        'id': 'PIECE-' + coords[0] + coords[1],
        'class': 'OH',
        'fill-opacity': '0',
        'stroke': '#000',
        'strokeWidth': 5
    });
}

function draw_place(paper, o) {

  paper
    .rect({
      'x': o.x,
      'y': o.y,
      'width': o.width,
      'height': o.height,
      'rx': o.rx,
      'ry': o.ry,
    })
    .attr({
      'id': o.id,
      'fill': '#facade',
      'stroke': '#000',
      'strokeWidth': 2,
      'class': 'BG'
    });
}

function draw_board(paper, o) {
  var factor = size * 2

  for ( x0 in [0, 1, 2] ) {
    for ( y0 in [0, 1, 2] ) {

      draw_place(paper, {
        "id": 'MOVE-' + x0 + y0,
        "x": x0 * factor,
        "y": y0 * factor,
        "width": factor,
        "height": factor,
        "rx": 0,
        "ry": 0
      });
    }
  }
}

module.exports = { 

  'render' : function (paper, req) {

    var events = req.body.events;
    draw_board(paper);

    if ( events == undefined ) {
      return
    }

    for (e of events) {
      var x = parseInt(e.action[1]);
      var y = parseInt(e.action[2]);

      if (e.action[0] == 'X') {
        draw_x(paper, [x, y]);
      }

      if (e.action[0] == 'O') {
        draw_o(paper, [x, y]);
      }

    }

  },

  'resource': function (base_uri, params) {
    return base_uri + '/stream/' + params.template + '/' + params.oid
  }
}
