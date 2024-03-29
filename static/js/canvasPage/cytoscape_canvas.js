var cy;

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
      'background-image': '/static/img/Dialogue.png'
    }
  },
  {
    selector: '.Evidence',
    style: {
      'background-image': '/static/img/Evidence.png'
    }
  },
  {
    selector: '.Feedback',
    style: {
      'background-image': '/static/img/Feedback.png'
    }
  },
  {
    selector: '.Information',
    style: {
      'background-image': '/static/img/Information.png'
    }
  },
  {
    selector: '.Practice',
    style: {
      'background-image': '/static/img/Practice.png'
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
  },
  {
    selector: '.authorship',
    style: {
      'text-valign':'center',
      'text-halign':'center',
      'text-wrap': 'wrap',
      'shape': 'roundrectangle',
      'width': 'label',
      'height': 60,
      'background-fit': 'contain',
      'background-color':'#fff',
      'border-color':'#000',
      'border-width': 2,
      'border-opacity': 0.5,
      'padding': 30,
      'background-image': '/static/img/opicon.png'
    }
  }
];

function loadNewCytoscapeWith(elements) {
  setDefaultNewId({numberOfCanvasElements: elements.length});

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

  cy.on('click', function(evt) {
    let canvas = document.getElementById("canvas_input");
    canvas.focus();

    if (STATE.keyboard.shiftPressed && (evt.cyTarget.length === undefined || evt.cyTarget.length < 1)) { // Clicked on empty canvas
      removeSelectedNodeFromContext(evt);
    }
  });

  cy.on('cxttap', function(evt) {
    if (evt.cyTarget.length === undefined || evt.cyTarget.length < 1) { // Clicked on empty canvas
      removeSelectedNodeFromContext(evt);
    }
  });

  // When a node is selected
  cy.on('select', 'node', function (evt) {

    if (STATE.keyboard.shiftPressed) {
      cy.$("#" + evt.cyTarget._private.data.id).unselect();
      handleOptionClickOnNode(evt);
    } else {
      evt.cyTarget.addClass('selected');
      setSelectedId({selectedId: evt.cyTarget.id()});

      showSideBarForSelectedElement(evt);
    }
  });

  // When a node is unselected
  cy.on('unselect', 'node', function(evt) {
    evt.cyTarget.removeClass('selected');
    toggleSidebar(sidebarEnum.DEFAULT, evt);
  });

  // When a node is right-clicked
  cy.on('cxttap', 'node', function(evt) {
    handleOptionClickOnNode(evt);
  });

  // When an edge is selected
  cy.on('select', 'edge', function(evt) {
    evt.cyTarget.addClass('selected');
    setSelectedId({selectedId: evt.cyTarget.id()});
    toggleSidebar(sidebarEnum.ACTION, evt);
  });

  // When an edge is unselected
  cy.on('unselect', 'edge', function(evt) {
    evt.cyTarget.removeClass('selected');
    toggleSidebar(sidebarEnum.DEFAULT, evt);
  });

  // When an edge is right-clicked
  cy.on('cxttap', 'edge', function(evt) {
    if (evt.cyTarget.selected()) {
      cy.remove(evt.cyTarget);
      toggleSidebar(sidebarEnum.DEFAULT, evt);
    }
  });

  cy.on('remove', function(evt) {
    if (evt.cyTarget.children(".startstop").length > 0) {
      let cytoscapeWindow = cy.extent();

      if (evt.cyTarget.children("#start").length > 0) {
        cy.$("#start").unselect();
        cy.$("#start").remove();

        let x1 = cytoscapeWindow.x1 + (cytoscapeWindow.w / 10);
        cy.add(startNode(x1,0));
      }

      if (evt.cyTarget.children("#stop").length > 0) {
        cy.$("#stop").unselect();
        cy.$("#stop").remove();

        let x2 = cytoscapeWindow.x2 - (cytoscapeWindow.w / 10);
        cy.add(stopNode(x2,0));
      }
    }
  });
}

function startNode(x, y) {
  return {group: "nodes", data: {id: "start", start: true}, position: {x: x, y: y}, style: {label: "Start", class: "startstop"}, classes: "startstop"};
}

function stopNode(x, y) {
  return {group: "nodes", data: {id: "stop", start: false}, position: {x: x, y: y}, style: {label: "Stop", class: "startstop"}, classes: "startstop"};
}

function loadDefaultCytoscape() {
  loadNewCytoscapeWith([]);

  let cytoscapeWindow = cy.extent();
  let x1 = cytoscapeWindow.x1 + (cytoscapeWindow.w / 10);
  let x2 = cytoscapeWindow.x2 - (cytoscapeWindow.w / 10);

  cy.add(startNode(x1, 0));
  cy.add(stopNode(x2, 0));
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
