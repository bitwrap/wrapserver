
module.exports = {
  render: function (paper, req) {

    // TODO: render bitwrap state machine w/ correct state
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
         fill: 'blue',
         stroke: 'none'
      });
  }
}
