const http = require("http");
require("dotenv").config();
const {
  addTrainee,
  getAllTrainee,
} = require("./controllers/traineeController");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    // Preflight request
    res.writeHead(204);
    res.end();
    return;
  }

  let body = "";
  req
    .on("data", (chunk) => {
      body += chunk.toString();
    })
    .on("end", () => {
      if (req.url === "/") {
        res.write("App works properly");
        res.end();
      }
      if (req.url === "/api/trainee/add" && req.method === "POST") {
        addTrainee(res, body);
      } else if (req.url === "/api/trainee/getall" && req.method === "GET") {
        getAllTrainee(res);
      }
      // else {
      //   res.writeHead(404, { "Content-Type": "application/json" });
      //   res.write(JSON.stringify({ msg: "Not found" }));
      //   res.end();
      // }
    });
});

server.listen(process.env.PORT, () => {
  console.log("Server running at http://127.0.0.1:5055");
});
