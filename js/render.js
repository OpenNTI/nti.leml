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

    elements: elements,

    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': '',
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
        selector: '.notation',
        style: {
          'text-valign':'center',
          'text-halign':'center',
          'width': 45,
          'height': 10,
          'shape': 'ellipse',
          'background-color':'#fff',
          'border-color':'#000',
          'border-width': 2,
          'border-opacity': 0.9,
          'padding': 30
        }
      },
      {
        selector: '.buildingBlock',
        style: {
          'text-valign':'center',
          'text-halign':'center',
          'text-wrap': 'wrap',
          'shape': 'roundrectangle',
          'width': 'label',
          'height': 45,
          'background-fit': 'contain',
          'background-color':'#fff',
          'border-color':'#000',
          'border-width': 2,
          'border-opacity': 0.5,
          'padding': 30
        }
      },
      {
        selector: '.context',
        style: {
          'text-valign':'top',
          'text-halign':'center',
          'shape': 'roundrectangle',
          'padding': 20
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
      {
        selector: '.onlineasynchronous',
        style: {
          'background-color': '#42d1f4',
          'color': '#3872d1'
        }
      },
      {
        selector: '.onlinesynchronous',
        style: {
          'background-color': '#41f258',
          'color': '#35c649'
        }
      },
      {
        selector: '.classroom',
        style: {
          'background-color': '#f1ef40',
          'color': '#cecc33'
        }
      },
      {
        selector: '.experiential',
        style: {
          'background-color': '#ef60f7',
          'color': '#b647bc'
        }
      },
      {
        selector: '.dialogue',
        style: {
          'background-image': '../img/Dialogue.png'
        }
      },
      {
        selector: '.evidence',
        style: {
          'background-image': '../img/Evidence.png'
        }
      },
      {
        selector: '.feedback',
        style: {
          'background-image': '../img/Feedback.png'
        }
      },
      {
        selector: '.information',
        style: {
          'background-image': '../img/information.png'
        }
      },
      {
        selector: '.practice',
        style: {
          'background-image': '../img/Practice.png'
        }
      },
      {
        selector: '.learnerAction',
        style: {
          'line-style': 'solid',
          'target-arrow-fill': 'filled',
          'target-arrow-shape': 'triangle'
        }
      },
      {
        selector: '.facilitatorAction',
        style: {
          'line-style': 'dotted',
          'target-arrow-fill': 'hollow',
          'target-arrow-shape': 'triangle'
        }
      },
      {
        selector: '.systemAction',
        style: {
          'line-style': 'dashed',
          'target-arrow-fill': 'hollow',
          'target-arrow-shape': 'traingle-backcurve'
        }
      },
      {
        selector: '.notationEdge',
        style: {
          'line-style': 'dashed',
          'target-arrow-shape': 'none'
        }
      },
      {
        selector: '.selected',
        style: {
          'border-color': 'red',
          'border-width': 5
        }
      }
    ],

    layout: {
      // https://github.com/cytoscape/cytoscape.js-dagre
      name: 'dagre',
      rankDir: 'LR',
      avoidOverlap: true,
      avoidOverlapPadding: 40
    },

    minZoom: 0.25,
    maxZoom: 5,
    selectionType: 'single',
    autounselectify: false,

  });

  cy.snapToGrid();
  cy.snapToGrid('snapOn');
  cy.snapToGrid('gridOn');

  cy.on('select', 'node', function() {
    this.addClass('selected');
  });

  cy.on('unselect', 'node', function() {
    this.removeClass('selected');
  });
}

$(loadNewCytoscapeWith(defaultElements));
