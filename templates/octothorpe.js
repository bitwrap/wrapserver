function render(paper, req) {
  //console.log(req);

  paper
    .circle(100, 100, 50)
    .attr({
      id: 'foo',
      fill: '#facade',
      stroke: '#000',
      strokeWidth: 2,
      class: 'place'
    });

  paper
    .rect(90, 90, 20, 20, 3)
    .attr({
       fill: req.query.color || 'red',
       stroke: 'none'
    });
}

module.exports = render
