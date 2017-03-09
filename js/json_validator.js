// Prepare JSON Schema validation
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
var validateLem = function(schema) { console.error("Schema could not be loaded!")};
$.getJSON("../lemSchema.json", function(schema) {
  validateLem = ajv.compile(schema);
});

function checkLemStructure() {
  var totalCount = cy.$().length;
  var predecessorsCount = cy.$("#stop").predecessors().length;

  var contextCount = 0;
  cy.nodes().map(function(node) {
    if (node.hasClass("context")) {
      ++contextCount;
    }
  });

  // Minus 1 for stop node which is not a predecessor of itself
  var unconnectedObjects = totalCount - predecessorsCount - contextCount - 1;
  if (unconnectedObjects > 0) {
    return "Graph has " + unconnectedObjects + " unconnected objects";
  }

  return "";
}
