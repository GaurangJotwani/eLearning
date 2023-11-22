import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
const morgan = require("morgan");
require("dotenv").config();
import cookieParser from "cookie-parser";

const csrfProtection = csrf({ cookie: true });

// create express app
const app = express();

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(csrfProtection);

//routes
readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
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
