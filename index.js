import express from "express";
import glob from "glob";
import asyncHandler from "express-async-handler";
import morgan from "morgan";
const app = express();

app.disable("x-powered-by");
app.use(morgan("tiny"));

glob
  .sync("api/**/*.js", { ignore: ["api/node_modules/**"] })
  .forEach((file) => {
    let func;
    const requiredFile = require(`./${file}`);

    if (typeof requiredFile === "function") {
      func = requiredFile;
    } else if (typeof requiredFile.default === "function") {
      func = requiredFile.default;
    } else {
      return;
    }

    const endpoint = file
      .replace(/^api/, "")
      .replace(/\.js$/, "")
      .replace(/index$/, "");

    app.all(endpoint, asyncHandler(func));
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
