import express from "express";
import dir from "node-dir";

const app = express();

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

dir.files("./api", { sync: true }).forEach((file) => {
  if (!file.endsWith(".js")) {
    return;
  }

  const endpoint = file
    .replace(/^api/, "")
    .replace(/\.js$/, "")
    .replace(/index$/, "");
  const func = require(`./${file}`);
  if ("default" in func) {
    app.all(endpoint, catchAsync(func.default));
  } else {
    app.all(endpoint, catchAsync(func));
  }
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

app.disable("x-powered-by");

app.listen(process.env.PORT || 3010, () => console.log("Server ready"));
