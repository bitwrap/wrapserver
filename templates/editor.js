var size = 20;

function draw_icon(paper, o) {
  paper
    .rect({'x': o.x, 'y': o.y, 'width': o.width, 'height': o.height, 'rx': o.rx, 'ry': o.ry})
    .attr({'id': o.id, 'fill': '000', 'fill-opacity': 0.01, 'stroke': '#ccc', 'strokeWidth': 2, 'class': 'icon'});
}

function draw_arc(source, target) {
  //FIXME
}

function draw_place(paper, o) {
  paper
    .circle({'cx': o.x, 'cy': o.y, 'r': (size * 4/5)})
    .attr({'id': o.id, 'class': 'place', 'fill-opacity': '0', 'stroke': '#000', 'strokeWidth': 2});
}

function draw_grid_point(paper, o) {
  // add single element of grid array and 
  // TODO add selector point for 'snapping' PNML element placement
}

function draw_menu(paper, o) {
  var factor = size * 2;
  var y0 = 5;
  var x0 = 0;

  var group = paper.group().attr({ 'id': 'edt-menu'});

  tool_pallet = {
    'select': function (){
    },

    'place': function () {
      draw_place(group, { "id": 'icon-' + label, "x": x0 * factor + size, "y": y0 + size, "width": factor, "height": factor, "rx": 0, "ry": 0 })
    },

    'transition': function () {
    },

    'arc': function () {
    },

    'token': function () {
    }
  }

  for ( label in tool_pallet) {
    tool_pallet[label]();
    draw_icon(group, {"id": label, "x": x0 * factor, "y": y0, "width": factor, "height": factor, "rx": 0, "ry": 0});
    x0 += 1
  }
}

module.exports = { 
  'render' : function (w, callback) {
    w.paper.attr({'width': '1200', 'height': '800'});
    draw_menu(w.paper, {});

    if ( w.data && callback) { callback(w) };
  },

  'resource': function (base_uri, params) {
    return base_uri + '/machine/' + params.oid
  }
}
