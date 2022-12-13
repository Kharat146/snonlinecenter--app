const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
module.exports = () => {
  const paths = {};
  fs.readdirSync(__dirname).forEach((file) => {
    const pathsModule = file.split(".");
    if (pathsModule[0] != "index" && pathsModule[1] === "yaml") {
      const route_doc = yaml.load(
        fs.readFileSync(
          path.join(__dirname + "/../../docs/routes/" + file),
          "utf8"
        )
      );
      if (route_doc) {
        // paths.push(route_doc)
        for (const key in route_doc) {
          if (Object.hasOwnProperty.call(route_doc, key)) {
            const element = route_doc[key];
            paths[key] = element;
          }
        }
      }
    }
  });
  return paths;
};
