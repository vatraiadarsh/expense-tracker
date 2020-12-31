import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<p>Server app</p>");
});

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
