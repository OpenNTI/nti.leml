var cy;
var selectedId;
var defaultElements = [ // list of graph elements to start with
  // { // node a
  //   data: { id: 'a' }
  // },
  // { // node b
  //   data: { id: 'b' }
  // },
  // { data: { id: 'c' } },
  // { data: { id: 'c:c', parent: 'c' } },
  // { data: { id: 'c:d', parent: 'c' } },
  // { data: { id: 'c:e', parent: 'c' } },
  // { data: { id: 'c:f', parent: 'c' } },
  // { // edge ab
  //   data: { id: 'ab', source: 'a', target: 'b' }
  // }
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
        selector: '.Online_Asynchronous',
        style: {
          'background-color': '#e6f2ff',
          'border-color': '#99ccff',
          'color': '#3872d1'
        }
      },
      {
        selector: '.Online_Synchronous',
        style: {
          'background-color': '#e6fff2',
          'border-color': '#99ff99',
          'color': '#35c649'
        }
      },
      {
        selector: '.Classroom',
        style: {
          'background-color': '#ffffe6',
          'border-color': '#ffcc99',
          'color': '#cecc33'
        }
      },
      {
        selector: '.Experiential',
        style: {
          'background-color': '#f1ef40',
          'border-color': '#cc99ff',
          'color': '#b647bc'
        }
      },
      {
        selector: '.Dialogue',
        style: {
          'background-image': '../img/Dialogue.png'
        }
      },
      {
        selector: '.Evidence',
        style: {
          'background-image': '../img/Evidence.png'
        }
      },
      {
        selector: '.Feedback',
        style: {
          'background-image': '../img/Feedback.png'
        }
      },
      {
        selector: '.Information',
        style: {
          'background-image': '../img/information.png'
        }
      },
      {
        selector: '.Practice',
        style: {
          'background-image': '../img/Practice.png'
        }
      },
      {
        selector: '.Learner_Action',
        style: {
          'line-style': 'solid',
          'target-arrow-fill': 'filled',
          'target-arrow-shape': 'triangle'
        }
      },
      {
        selector: '.Facilitator_Action',
        style: {
          'line-style': 'dotted',
          'target-arrow-fill': 'hollow',
          'target-arrow-shape': 'triangle'
        }
      },
      {
        selector: '.System_Action',
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

  cy.on('select', 'node', function(evt) {
    evt.cyTarget.addClass('selected');
    selectedId = evt.cyTarget.id();
    //console.log(evt.cyTarget);
    if (evt.cyTarget.hasClass('buildingBlock')) {
      toggleSidebar(1, evt);
    } else if (evt.cyTarget.hasClass('context')) {
      toggleSidebar(3, evt);
    } else if (evt.cyTarget.hasClass('notation')) {
      toggleSidebar(4,evt);
    } else {
      toggleSidebar(0, evt);
    }
  });

  cy.on('unselect', 'node', function(evt) {
    evt.cyTarget.removeClass('selected');
    toggleSidebar(0, evt);
  });

  cy.on('cxttap', 'node', function(evt) {
    var nodes = cy.json().elements.nodes;
    nodes.map(function(val) {
      if (val.selected) {
        if (val.classes.includes("buildingBlock")) {
            if (evt.cyTarget.id() != val.data.id) {
              cy.add([{group: "edges", data: {id: new_id, action_type: "Learner Action", source: val.data.id, target: evt.cyTarget.id()}}]);
            } else {
              cy.remove(evt.cyTarget);
              toggleSidebar(0, evt);
            }
        } else if (val.classes.includes("context")) {
          if (evt.cyTarget.id() != val.data.id) {
          var data = evt.cyTarget.json().data;
          var classes = evt.cyTarget.json().classes;
          var label = evt.cyTarget.style().label;
          var position = evt.cyTarget.position();
          cy.remove(evt.cyTarget);
          data.parent = val.data.id;
          //cy.$('#' + data.id).data(data);
          cy.add({group: "nodes", data: data, position: position, style: {label: label}, classes: classes});
          //evt.cyTarget.data('parent', val.data.id);
          val.data.building_blocks.push(evt.cyTarget.id());
          //cy.$('#' + val.data.id).data(val.data);
          //cy.load();
          cy.resize();
          //console.log(cy.$('node'));
        } else {
          cy.remove(evt.cyTarget);
        }
        }
      }
    });



    // for (index in cy.elements()) {
    //   ele = cy.elements()[index];
    //   var classes = ele.json()['classes'];
    //   if (classes.includes("selected")) {
    //     console.log("?");
    //     if (classes.includes("buildingBlock")) {
    //       console.log("??");
    //       if (ele.id() != this.id()) {
    //         cy.add([{group: "edges", data: {id: new_id, action_type: "Learner Action", source: ele.id(), target: this.id()}}]);
    //         new_id = new_id + 1;
    //         break;
    //       } else {
    //         cy.remove(this);
    //       }
    //     } else if (ele.json()['classes'].includes("context")) {
    //       //var buildingBlock = {id, block_type:, description:, method:, parent:};
    //       console.log("???");
    //       console.log(this);
    //       var context = ele;

    //     }
    //   }
    // }
  });

  cy.on('select', 'edge', function(evt) {
    toggleSidebar(2, evt);
  });

  cy.on('cxttap', 'edge', function(evt) {
    cy.remove(evt.cyTarget);
    toggleSidebar(0, evt);
  });
}

$(loadNewCytoscapeWith(defaultElements));
