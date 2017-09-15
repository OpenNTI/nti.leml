function showSideBarForSelectedElement(evt) {
    if (evt.cyTarget.hasClass('buildingBlock')) {
      toggleSidebar(sidebarEnum.BLOCK, evt);
    } else if (evt.cyTarget.hasClass('context')) {
      toggleSidebar(sidebarEnum.CONTEXT, evt);
    } else if (evt.cyTarget.hasClass('notation')) {
      toggleSidebar(sidebarEnum.OBJECTIVE, evt);
    } else if (evt.cyTarget.hasClass('startstop')) {
      toggleSidebar(sidebarEnum.STARTSTOP, evt);
    } else {
      toggleSidebar(sidebarEnum.DEFAULT, evt);
    }
  }

function drawEdgeBetweenSelectedNodes(evt) {
  var nodes = cy.json().elements.nodes;
  nodes.map(function(val) {
    if (val.selected) { // If a node is selected
      if (val.classes.includes("buildingBlock") || val.classes.includes("startstop") || val.classes.includes("notation")) { // If the selected node is a buildingBlock, startstop, or notation
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
            if (evt.cyTarget.id() != val.data.id) { // If the selected node is NOT the one clicked
              cy.add([{group: "edges", data: {id: STATE.canvas.new_unique_id, action_type: defaultActionType, source: val.data.id, target: evt.cyTarget.id()}, classes: defaultClass}]);
              incrementNewId();
            } else {
              if (!val.classes.includes("startstop")) {
                cy.remove(evt.cyTarget);
                toggleSidebar(sidebarEnum.DEFAULT, evt);
              }
            }
          }
      } else if (val.classes.includes("context")) { // If the selected node is a context
        if (evt.cyTarget.id() != val.data.id) {
          if (!evt.cyTarget.json().classes.includes("context")) {
            let selectedNode = {
              group: "nodes",
              data: evt.cyTarget.json().data,
              position: evt.cyTarget.position(),
              style: {label: evt.cyTarget.style().label},
              classes: evt.cyTarget.json().classes
            };

            let edgesConnectedToSelectedNode = cy.elements('edge[source = "' + evt.cyTarget.id() + '"], edge[target = "' + evt.cyTarget.id() + '"]');
            var edges = [];
            for (let index = 0; index < edgesConnectedToSelectedNode.length; index++) {
              let edge = edgesConnectedToSelectedNode[index];
              let edgeJson = edgesConnectedToSelectedNode[index].json();
              let edgeOutput = {
                group: "edges",
                data: edgeJson.data,
                style: edge.style(),
                classes: edgeJson.classes
              }
              edges.push(edgeOutput);
            }

            cy.remove(evt.cyTarget);

            selectedNode.data.parent = val.data.id;
            cy.add(selectedNode);

            var addedBuildingBlockID = evt.cyTarget.id();
            val.data.building_blocks.push(addedBuildingBlockID);

            // Add edges
            for (let index = 0; index < edges.length; index++) {
              cy.add(edges[index]);
            }
            cy.resize();
          }
        } else { // Go back to the start canvas
          cy.remove(evt.cyTarget);
          toggleSidebar(sidebarEnum.DEFAULT, evt);
        }
      }
    }
  });
}

function removeSelectedElements() {
  removeSelectedNodes();
  removeSelectedEdges();
}

function removeSelectedNodes() {
  let nodes = cy.json().elements.nodes;
  if (nodes && nodes.length > 0) {
    nodes.map(function(val) {
      if (val.selected && !val.classes.includes("startstop")) {
        cy.$("#" + val.data.id).unselect();
        cy.$("#" + val.data.id).remove();
      }
    });
  }
}

function removeSelectedEdges() {
  let edges = cy.json().elements.edges;
  if (edges && edges.length > 0) {
    edges.map(function(val) {
      if (val.selected && !val.classes.includes("startstop")) {
        cy.$("#" + val.data.id).unselect();
        cy.$("#" + val.data.id).remove();
      }
    });
  }
}
