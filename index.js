const http = require("http");
require("dotenv").config();

function corsMiddleware(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    corsMiddleware(req, res, () => {
      res.write("i am a server side");
    });
  } else if (req.url === "/api" && req.method === "GET") {
    corsMiddleware(req, res, () => {
      const data = { message: "Hello, world!" };
      const jsonData = JSON.stringify(data);

      res.setHeader("Content-Type", "application/json");
      res.end(jsonData);
    });
  } else {
    res.end();
  }
});

server.listen(process.env.PORT || 5055, () => {
  console.log("Server running at http://127.0.0.1:5055");
});
