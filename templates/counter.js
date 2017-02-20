module.exports = { 

  'render' : function (paper, req) {

    // KLUDGE: fallback to list if it is given instead of single event
    var evt = req.body.event || req.body.events[0] || {}

    paper
      .rect(10, 10, 120, 20, 5, 5)
      .attr({
        fill: '#facade',
        stroke: '#000',
        strokeWidth: 2,
        class: 'counter'
      });

    paper
      .text(18, 25, evt.oid + ' -> ' + evt.state)
      .attr({
         fill: 'black',
         stroke: 'black'
      });
  },

  'resource': function (base_uri, params) {
    return base_uri + '/head/' + params.template + '/' + params.oid
  }
}

