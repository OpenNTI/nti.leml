var cy;
var selectedId;

var lemStyle = [ // the stylesheet for the graph
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
      'text-wrap': 'wrap',
      'text-margin-y': -12,
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
      'width': 'label',
      'height': 'label',
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
      'background-color': '#d9b8f9',
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
      'background-image': '../img/Information.png'
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
      'border-width': 5,
      'line-color': 'red',
      'target-arrow-color': 'red',
    }
  }
];

function loadNewCytoscapeWith(elements) {
  new_id = elements.length;

  cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: elements,

    style: lemStyle,

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

  cy.center();
  cy.snapToGrid();
  cy.snapToGrid('snapOn');
  cy.snapToGrid('gridOn');

  cy.on('select', 'node', function(evt) {
    console.log(evt.cyTarget);
    evt.cyTarget.addClass('selected');
    selectedId = evt.cyTarget.id();

    if (evt.cyTarget.hasClass('buildingBlock')) {
      toggleSidebar(1, evt);
    } else if (evt.cyTarget.hasClass('context')) {
      toggleSidebar(3, evt);
    } else if (evt.cyTarget.hasClass('notation')) {
      toggleSidebar(4, evt);
    } else if (evt.cyTarget.hasClass('startstop')) {
      toggleSidebar(5, evt);
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
        if (val.classes.includes("buildingBlock") || val.classes.includes("startstop") || val.classes.includes("notation")) {
            var defaultActionType = "Learner Action";
            var defaultClass = "Learner_Action";

            if (val.classes.includes("notation")) {
              defaultActionType = "notationEdge";
              defaultClass = "notationEdge";
            }

            var duplicateActionSelector = "[source = '" + val.data.id + "'][target = '" + evt.cyTarget.id() + "']";
            var duplicateActions = cy.$(duplicateActionSelector);

            if (duplicateActions.length > 0) {
              showCanvasError("Cannot draw two edges between one pair of items.");
              console.error("Cannot draw two edges between one pair of items.");
            } else {
              if (evt.cyTarget.id() != val.data.id) {
                cy.add([{group: "edges", data: {id: new_id, action_type: defaultActionType, source: val.data.id, target: evt.cyTarget.id()}, classes: defaultClass}]);
                new_id = new_id + 1;
              } else {
                if (!val.classes.includes("startstop")) {
                  cy.remove(evt.cyTarget);
                  toggleSidebar(0, evt);
                }
              }
            }
        } else if (val.classes.includes("context")) {
          if (evt.cyTarget.id() != val.data.id) {
            if (!evt.cyTarget.json().classes.includes("context")) {

          var data = evt.cyTarget.json().data;
          var classes = evt.cyTarget.json().classes;
          var label = evt.cyTarget.style().label;
          var position = evt.cyTarget.position();
          var out_edges = cy.elements('edge[source = "' + evt.cyTarget.id() + '"], edge[target = "' + evt.cyTarget.id() + '"]');
          var index = 0;
          var edges = [];
          for (index = 0; index < out_edges.length; index++) {
            edges.push(out_edges[index].json().data);
          }
          cy.remove(evt.cyTarget);
          data.parent = val.data.id;
          //cy.$('#' + data.id).data(data);
          cy.add({group: "nodes", data: data, position: position, style: {label: label}, classes: classes});
          //evt.cyTarget.data('parent', val.data.id);

          // Convert id from string to int
          var addedBuildingBlockID = evt.cyTarget.id() * 1;
          val.data.building_blocks.push(addedBuildingBlockID);

          // Add edges
          for (index = 0; index < edges.length; index++) {
            cy.add({group: "edges", data: edges[index]});
          }
          //cy.$('#' + val.data.id).data(val.data);
          //cy.load();
          cy.resize();
          //console.log(cy.$('node'));
            }
          } else {
            cy.remove(evt.cyTarget);
            toggleSidebar(0, evt);
          }
        }
      }
    });
  });

  cy.on('select', 'edge', function(evt) {
    evt.cyTarget.addClass('selected');
    selectedId = evt.cyTarget.id();
    toggleSidebar(2, evt);
  });

  cy.on('unselect', 'edge', function(evt) {
    evt.cyTarget.removeClass('selected');
    toggleSidebar(0, evt);
  });

  cy.on('cxttap', 'edge', function(evt) {
    cy.remove(evt.cyTarget);
    toggleSidebar(0, evt);
  });
}

function loadDefaultCytoscape() {
  loadNewCytoscapeWith([]);

  var wind = cy.extent();
  var x1 = wind.x1 + (wind.w / 10);
  var x2 = wind.x2 - (wind.w / 10);
  cy.add({group: "nodes", data: {id: "start", start: true}, position: {x: x1, y: 0}, style: {label: "Start", class: "startstop"}, classes: "startstop"});
  cy.add({group: "nodes", data: {id: "stop", start: false}, position: {x: x2, y: 0}, style: {label: "Stop", class: "startstop"}, classes: "startstop"});
}

function showCanvasError(error) {
  $("#canvasErrorLabel").text(error);
  $("#canvasErrorLabel").fadeIn();

  // Fade out after three seconds
  window.setTimeout(function() {
    $("#canvasErrorLabel").fadeOut()
  }, 3000);
}

$(loadDefaultCytoscape());
