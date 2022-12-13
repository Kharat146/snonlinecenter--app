require("dotenv").config();
const waitport = require("wait-port");

let MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
let MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
let MYSQL_USER = process.env.MYSQL_USER || "";
let MYSQL_DB = process.env.MYSQL_DB || "";
let MYSQL_PORT = process.env.MYSQL_PORT || "";
const env = process.env.NODE_ENV || "development";

let pool = null;

async function connectToPg() {
  try {
    const { Client } = require('pg')
    let dbconfig = require(__dirname + "/../config/config.json");
    const SELECTED_DB_ENV = config.SELECTED_DB_ENV;
    dbconfig = dbconfig[SELECTED_DB_ENV][env]
    await waitport({ host: dbconfig.host, port: parseInt(dbconfig.port) });
    const creds = {
      host: dbconfig.host,
      user: dbconfig.username,
      port: dbconfig.port,
      password: dbconfig.password
    }

    const client = new Client(creds);
    await client.connect();
    await client.query("SELECT 'CREATE DATABASE creditap' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'creditap')")
    await client.end()
    return client;
  } catch (error) {
    console.log(error);
  }
}

async function connectToMysql() {
  try {
    const mysql = require("mysql2/promise");
    MYSQL_HOST = config.DB_CONFIG.HOST;
    MYSQL_PASSWORD = config.DB_CONFIG.PASSWORD;
    MYSQL_USER = config.DB_CONFIG.USER;
    MYSQL_DB = config.DB_CONFIG.db;
    await waitport({ host: MYSQL_HOST, port: parseInt(MYSQL_PORT) });
    const conn = await mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DB,
      waitForConnections: true,
      queueLimit: 0,
    });
    await conn.end();
    return conn;
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  MYSQL_PORT = config.DB_CONFIG.PORT;
  const SELECTED_DB_ENV = config.SELECTED_DB_ENV
  if (SELECTED_DB_ENV === 'mysql') {
    return await connectToMysql();
  } else {
    return await connectToPg();
  }
  
}

async function tearDown() {
  return new Promise((resolve, reject) => {
    pool.end((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  init,
  tearDown,
};
