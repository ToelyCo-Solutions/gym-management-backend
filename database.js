const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Be@stm0de",
  database: "gymmanagement",
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

pool.on("connect", () => {
  console.log("Database connected");
});
pool.on("end", () => {
  console.log("Database connection end");
});

module.exports = pool;
