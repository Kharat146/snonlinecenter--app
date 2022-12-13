const swaggerJSDoc = require("swagger-jsdoc");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const paths = require("../../docs/routes")();
const schemas = require("../../docs/schemas")();
const configPath = path.join(__dirname,"../../config.yaml")
const config = yaml.load(fs.readFileSync(configPath, "utf8"));

module.exports = () => {
  const servers = yaml.load(
    fs.readFileSync(path.join(__dirname + "/../../docs/servers.yaml"), "utf8")
  );
  if (config.APP_CONFIG.NODE_ENV == 'production') {
    servers['servers'][0] = {
      url: 'http://localhost:3008/api/v1',
      description: 'local server'
    }
  }
  const info = yaml.load(
    fs.readFileSync(path.join(__dirname + "/../../docs/basicinfo.yaml"), "utf8")
  );
  const tags = yaml.load(
    fs.readFileSync(path.join(__dirname + "/../../docs/tags.yaml"), "utf8")
  );
  const components = yaml.load(
    fs.readFileSync(
      path.join(__dirname + "/../../docs/components.yaml"),
      "utf8"
    )
  );
  const securitySchemes = yaml.load(
    fs.readFileSync(
      path.join(__dirname + "/../../docs/securityDefinations.yaml"),
      "utf8"
    )
  );
  components["schemas"] = schemas;
  components["securitySchemes"] = securitySchemes;
  const doc = {
    definition: {
      openapi: "3.0.0",
      info: info,
      servers: servers["servers"], // servers needd to define here
      tags: tags["tags"],
      paths: paths,
      components: components,
    },
    apis: [],
  };
  // console.log(doc)
  const swaggerSpec = swaggerJSDoc(doc);
  return swaggerSpec;
};
