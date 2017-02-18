module.exports = { 

  'render' : function (paper, req) {
    //console.log(req);
    var evt = req.body.event || {};

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

  'resource': '/head/{schema}/{oid}'
}

