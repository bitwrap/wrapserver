var size = 20;

function draw_piece(paper, coords, seq) {
  // draw checkers 'piece' element on board
  var x = coords[1] * size * 2 + size;
  var y = coords[0] * size * 2 + size;

  // support 'king' pieces
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

function draw_board_square(paper, o) {
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
      'fill': '#eee',
      'stroke': '#ccc',
      'strokeWidth': 2,
      'class': 'BG'
    });
}

function draw_board(paper, o) {
  var factor = size * 2

  seq = Array.apply(null, Array(8)).map(function (_, i) {return i;});

  for ( y0 in seq ) {
    for ( x0 in seq) {

      draw_board_square(paper, {
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
  'render' : function (paper, machine) {

    paper.attr({'width': '1200', 'height': '800'})
    draw_board(paper);

    if ( events == undefined ) {
      return
    }

    // TODO: render checkers pieces
    // by iterating over move events

  },

  'resource': function (base_uri, params) {
    return base_uri + '/stream/' + params.template + '/' + params.oid
  }
}
