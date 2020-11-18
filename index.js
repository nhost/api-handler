import express from "express";
import dir from "node-dir";

const app = express();

dir.files("./api", { sync: true }).forEach((file) => {
  const endpoint = file
    .replace(/^api/, "")
    .replace(/\.js$/, "")
    .replace(/index$/, "");
  const func = require(`./${file}`);
  if ("default" in func) {
    app.all(endpoint, func.default);
  } else {
    app.all(endpoint, func);
  }
});

app.disable("x-powered-by");

app.listen(process.env.PORT || 3010, () => console.log("Server ready"));
