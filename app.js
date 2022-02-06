const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");

// set up express app
const app = express();

// connect to mongodb
mongoose.connect("mongodb://localhost/humandb");

// listen for request
app.listen(process.env.port || 3000, () => {
  console.log("listening request on port 3000");
});

app.use(express.static("public"));
app.use(express.json());
app.use("/api", apiRouter);

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(422).send({ error: err.message });
});
