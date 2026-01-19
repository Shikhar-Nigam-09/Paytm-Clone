const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

require("./db");

app.use(express.json());
app.use(cors());


const apiRouter = require("./routes");

app.use("/api/v1", apiRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});



