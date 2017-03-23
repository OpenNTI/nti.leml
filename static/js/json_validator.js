// Prepare JSON Schema validation
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
var validateLem = function(schema) { console.error("Schema could not be loaded!")};
$.getJSON("../lemSchema.json", function(schema) {
  validateLem = ajv.compile(schema);
});
