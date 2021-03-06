var size = 40;

function draw_x(paper, coords, seq) {
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
        'id': 'event-' + seq,
        'class': 'X',
        'fill-opacity': '0',
        'stroke': '#000',
        'strokeWidth': 5
    });
}

function draw_o(paper, coords, seq) {
  var x = coords[1] * size * 2 + size;
  var y = coords[0] * size * 2 + size;

  paper
    .circle({
      'cx': x,
      'cy': y,
      'r': (size/2)
    }).attr({
        'id': 'event-' + seq,
        'class': 'O',
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

function draw_board(paper) {
  var factor = size * 2

  for ( y0 in [0, 1, 2] ) {
    for ( x0 in [0, 1, 2] ) {

      draw_place(paper, {
        "id": 'square-' + y0 + x0,
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

  'render' : function (w, callback) {

    w.paper.attr({'width': '245', 'height': '245'});
    draw_board(w.paper);

    if ( w.data == undefined ) {
      return
    }

    for (e of w.data) {
      var x = parseInt(e.action[1]);
      var y = parseInt(e.action[2]);

      if (e.action[0] == 'X') {
        draw_x(w.paper, [x, y], e.seq - 1);
      }

      if (e.action[0] == 'O') {
        draw_o(w.paper, [x, y], e.seq - 1);
      }

    }

    if (callback) { callback(w) }

  },

  'resource': function (base_uri, params) {
    return base_uri + '/stream/' + params.template + '/' + params.oid
  }
}
