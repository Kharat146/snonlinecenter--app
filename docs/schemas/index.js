const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
module.exports = () => {
  const schemas = {};
  fs.readdirSync(__dirname).forEach((file) => {
    const pathsModule = file.split(".");
    if (pathsModule[0] != "index" && pathsModule[1] === "yaml") {
      let schema_doc = yaml.load(
        fs.readFileSync(
          path.join(__dirname + "/../../docs/schemas/" + file),
          "utf8"
        )
      );
      if (schema_doc) {
        const key = Object.keys(schema_doc)[0];
        schemas[key] = schema_doc[key];
      }
    }
  });
  return schemas;
};