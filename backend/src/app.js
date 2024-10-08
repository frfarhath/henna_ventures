require("./config/db");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");


const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

module.exports = app;
