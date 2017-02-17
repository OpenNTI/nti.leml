var cy;
var defaultElements = [ // list of graph elements to start with
  { // node a
    data: { id: 'a' }
  },
  { // node b
    data: { id: 'b' }
  },
  { data: { id: 'c' } },
  { data: { id: 'c:c', parent: 'c' } },
  { data: { id: 'c:d', parent: 'c' } },
  { data: { id: 'c:e', parent: 'c' } },
  { data: { id: 'c:f', parent: 'c' } },
  { // edge ab
    data: { id: 'ab', source: 'a', target: 'b' }
  }
];

function loadNewCytoscapeWith(elements) {
  cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    layout: {
      name: 'cose-bilkent'
    },

    elements: elements,

    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 4,
          'line-color': '#000',
          'target-arrow-color': '#000',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        }
      },

      {
        selector: '.startstop',
        style: {
          'background-color': '#000',
          'label': ''
        }
      },

      {
        selector: ':parent',
        style: {
          'background-opacity': 0.333
        }
      },
    ],

    layout: {
      name: 'grid',
      rows: 1
    }

  });
}

$(loadNewCytoscapeWith(defaultElements));
