const express = require("express");
const PORT = 8080;

const app = express();

const router = require("../server/src/router");
app.use(router);

var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
