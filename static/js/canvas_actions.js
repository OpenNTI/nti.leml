function canvasReduce(action, name) {
    reduce(function(prevState) {
      let prevCanvasState = prevState.canvas;
      return {
        ...prevState,
        canvas: action(prevCanvasState)
      }
    },
    name
  );
}

function incrementNewId() {
  canvasReduce(function(prevCanvasState) {
      return {
        ...prevCanvasState,
        new_unique_id: prevCanvasState.new_unique_id + 1
      }
    },
    "Increment New ID"
  );
}

function setDefaultNewId(params) {
  canvasReduce(function(prevCanvasState) {
      return {
        ...prevCanvasState,
        new_unique_id: params.numberOfCanvasElements
      }
    },
    "Set Default New ID"
  );
}

function ensureNewIdIsUnique() {
  canvasReduce(function(prevCanvasState) {
      var unique_id = prevCanvasState.new_unique_id;

      while(cy.$("#" + unique_id).length > 0) {
        ++unique_id;
      }

      return {
        ...prevCanvasState,
        new_unique_id: unique_id
      }
    },
    "Ensure New ID Is Unique"
  );
}
