var size = 20;

function draw_transition(paper, o) {
  // FIXME: alter to draw a 'transition' PNML element

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

function draw_arc(source, target) {
  //FIXME
}

function draw_place(paper, coords, seq) {
  // draw PNML 'place' element
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

function draw_grid_point(paper, o) {
  // add single element of grid array and 
  // TODO add selector point for 'snapping' PNML element placement
}

function draw_grid(paper, o) {
  var factor = size * 2

  seq = Array.apply(null, Array(32)).map(function (_, i) {return i;});

  for ( y0 in seq ) {
    for ( x0 in seq) {

      draw_grid_point(paper, {
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
  // TODO: export functions / DSL for front-end GUI

  'render' : function (widget, callback) {
    widget.paper.attr({'width': '1200', 'height': '800'})

    console.log(widget.paper)
    // KLUDGE: May need to request SVG outside of widget template
    // if we want this to work outside of the browser
    var image_url  = '/image/editor.svg';

    if (widget.config.wrapserver != undefined ) {
      image_url = widget.config.wrapserver + image_url;
    }

    if ( widget.data != undefined && callback != undefined) {
      callback(widget.data)
    }

  },

  'resource': function (base_uri, params) {
    return base_uri + '/machine/' + params.oid
  }
}
