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

function removeSelectedNodeFromContext(evt) {
  let nodes = cy.json().elements.nodes;
  nodes.map(function(node) {
    if (node.selected && node.data.parent && node.data.parent.length > 0) {
      let selectedNodeInfo = removeNodeSavingInfo(cy.$("#"+node.data.id));
      let selectedNodeModel = selectedNodeInfo.node;
      selectedNodeModel.position = evt.cyPosition;
      let selectedNodeEdges = selectedNodeInfo.edges;
      createAndAddBuildingBlockOutsideContext(selectedNodeModel, selectedNodeEdges);
    }
  });
}

function handleOptionClickOnNode(evt) {
  var nodes = cy.json().elements.nodes;
  nodes.map(function(node) {
    if (node.selected) {
      let selectedNode = node;
      if (selectedNode.classes.includes("buildingBlock") || selectedNode.classes.includes("startstop") || selectedNode.classes.includes("notation")) { // If the selected node is a buildingBlock, startstop, or notation
          var defaultActionType = "Learner Action";
          var defaultClass = "Learner_Action";

          if (selectedNode.classes.includes("notation")) {
            defaultActionType = "notationEdge";
            defaultClass = "notationEdge";
          }

          var duplicateActionSelector = "[source = '" + selectedNode.data.id + "'][target = '" + evt.cyTarget.id() + "']";
          var duplicateActions = cy.$(duplicateActionSelector);

          if (duplicateActions.length > 0) {
            showCanvasError("Cannot draw two edges between one pair of items.");
            console.error("Cannot draw two edges between one pair of items.");
          } else {
            if (evt.cyTarget.id() != selectedNode.data.id) { // If the selected node is NOT the one clicked
              cy.add([{group: "edges", data: {id: STATE.canvas.new_unique_id, action_type: defaultActionType, source: selectedNode.data.id, target: evt.cyTarget.id()}, classes: defaultClass}]);
              incrementNewId();
            } else {
              if (!selectedNode.classes.includes("startstop")) {
                cy.remove(evt.cyTarget);
                toggleSidebar(sidebarEnum.DEFAULT, evt);
              }
            }
          }
      } else if (selectedNode.classes.includes("context")) { // If the selected node is a context
        if (evt.cyTarget.id() != selectedNode.data.id) { // If clicked node is different than selected node
          if (!evt.cyTarget.json().classes.includes("context")) {
            moveBuildingBlockIntoContext(evt.cyTarget, selectedNode);
          }
        } else { // Go back to the start canvas
          cy.remove(evt.cyTarget);
          toggleSidebar(sidebarEnum.DEFAULT, evt);
        }
      }
    }
  });
}

function moveBuildingBlockIntoContext(buildingBlock, context) {
  let clickedBuildingBlockID = buildingBlock.id();
  let labelDict = {};

  let edgesConnectedToSelectedNode = cy.elements('edge[source = "' + clickedBuildingBlockID + '"], edge[target = "' + clickedBuildingBlockID + '"]');
  for (let index = 0; index < edgesConnectedToSelectedNode.length; index++) {
    let edge = edgesConnectedToSelectedNode[index];
    labelDict[edge.id()] = edge.style().label;
  }
  labelDict[clickedBuildingBlockID] = buildingBlock.style().label;

  buildingBlock.move({
    parent: context.data.id
  });

  for (id in labelDict) {
    cy.$("#" + id).style("label", labelDict[id]);
  }
}

function removeNodeSavingInfo(node) {
    node.unselect();
    let selectedNode = {
      group: "nodes",
      data: node.json().data,
      position: node.position(),
      style: {label: node.style().label},
      classes: node.json().classes,
    };

    let edgesConnectedToSelectedNode = cy.elements('edge[source = "' + node.id() + '"], edge[target = "' + node.id() + '"]');
    var edges = [];
    for (let index = 0; index < edgesConnectedToSelectedNode.length; index++) {
      let edge = edgesConnectedToSelectedNode[index];
      let edgeJson = edgesConnectedToSelectedNode[index].json();
      edges.push(edgeJson);
    }

    cy.remove(node);

    return {
      node: selectedNode,
      edges: edges
    };
}

function createAndAddBuildingBlockOutsideContext(buildingBlockNode, buildingBlockEdges) {
  delete buildingBlockNode.data.parent;
  buildingBlockNode.classes = buildingBlockNode.classes.replace("selected", ""); //Newly added nodes won't be selected, so make them appear unselected
  cy.add(buildingBlockNode);
  cy.add(buildingBlockEdges);
}

function removeSelectedElements() {
  removeSelectedNodes();
  removeSelectedEdges();
}

function removeSelectedNodes() {
  let nodes = cy.json().elements.nodes;
  if (nodes && nodes.length > 0) {
    nodes.map(function(node) {
      if (node.selected && !node.classes.includes("startstop")) {
        cy.$("#" + node.data.id).unselect();
        cy.$("#" + node.data.id).remove();
      }
    });
  }
}

function removeSelectedEdges() {
  let edges = cy.json().elements.edges;
  if (edges && edges.length > 0) {
    edges.map(function(edge) {
      if (edge.selected && !edge.classes.includes("startstop")) {
        cy.$("#" + edge.data.id).unselect();
        cy.$("#" + edge.data.id).remove();
      }
    });
  }
}
