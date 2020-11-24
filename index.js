import express from "express";
import glob from "glob";
import asyncHandler from "express-async-handler";
import morgan from "morgan";
const app = express();

app.disable("x-powered-by");
app.use(morgan("tiny"));

glob.sync("api/**/*.js").forEach((file) => {
  console.log(file);
  const endpoint = file
    .replace(/^api/, "")
    .replace(/\.js$/, "")
    .replace(/index$/, "");
  const func = require(`./${file}`);
  console.log({ endpoint });
  app.all(endpoint, asyncHandler(func.default || func));
});

app.use((err, req, res, next) => {
  if (err) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

app.listen(process.env.PORT || 3010, () => console.log("Server ready"));
