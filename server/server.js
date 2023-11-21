import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";

const morgan = require("morgan");
require("dotenv").config();

// create express app
const app = express();

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log(err));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
