const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const routerModule = require("./api/routes");
const helmet = require("helmet");
const expressPinoLogger = require("express-pino-logger");
const logger = require("./api/services/logger");
const bodyParser = require('body-parser');
require("dotenv").config()

// logger middleware
const loggerMidleware = expressPinoLogger({
  logger: logger,
  autoLogging: true,
});

const swaggerJsDoc = require("./api/services/swagger");
const swaggerFile = swaggerJsDoc();

// init app dependencis
require("./init")();

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMidleware);
app.use(cors());

// const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
// delete cspDefaults['upgrade-insecure-requests'];

// app.use(helmet({
// contentSecurityPolicy: { directives: cspDefaults }
// }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(helmet());
// TODO ::route need to be implemented dynamically
routerModule(app);

// app.use('/api/', userRouter)
// app.use('/api/', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// listening to the port
app.listen(config.APP_CONFIG.PORT, config.APP_CONFIG.HOST, async () => {
  console.log("Server started.");
  // starting the DB
  await db.init();
  require('./api/models/');
});

const exitHandler = async (e) => {
  console.log(e);
  process.exit(1);
  // await db.tearDown()
};

process.on("uncaughtException", exitHandler);
process.on("unhandledRejection", exitHandler);
process.on("SIGTERM", exitHandler);
process.on("SIGINT", exitHandler);

module.exports = app;