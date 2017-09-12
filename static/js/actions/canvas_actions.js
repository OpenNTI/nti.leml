function canvasSelector(state) {
  return state.canvas;
}
let canvasReduce = reducerCreator(canvasSelector, "canvas");
let canvasActionCreator = createReducerSpecificActionCreator(canvasReduce);

function incrementNewIdAction(prevCanvasState) {
  return {
    ...prevCanvasState,
    new_unique_id: prevCanvasState.new_unique_id + 1
  }
}
let incrementNewId = canvasActionCreator("Increment New ID", incrementNewIdAction);

function setDefaultNewIdAction(prevCanvasState, params) {
  return {
    ...prevCanvasState,
    new_unique_id: params.numberOfCanvasElements
  }
}
let setDefaultNewId = canvasActionCreator("Set Default New ID", setDefaultNewIdAction);

function ensureNewIdIsUniqueAction(prevCanvasState, params) {
  var unique_id = prevCanvasState.new_unique_id;

  while(cy.$("#" + unique_id).length > 0) {
    ++unique_id;
  }

  return {
    ...prevCanvasState,
    new_unique_id: unique_id
  };
}
let ensureNewIdIsUnique = canvasActionCreator("Ensure New ID Is Unique", ensureNewIdIsUniqueAction);


function setSelectedIdAction(prevCanvasState, params) {
  return {
    ...prevCanvasState,
    selectedId: params.selectedId
  }
}
let setSelectedId = canvasActionCreator("Set Selected ID", setSelectedIdAction);
