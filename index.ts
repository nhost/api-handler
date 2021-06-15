import { Request, Response, NextFunction } from "express";
import express from "express";
import glob from "glob";
import asyncHandler from "express-async-handler";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

let stripeWebhookFile;

glob
  .sync("api/**/*.{js,ts}", { ignore: ["api/node_modules/**"] })
  .forEach((file) => {
    console.log(file);
    console.log("file:");

    if (["api/stripe-webhook.js", "api/stripe-webhook.ts"].includes(file)) {
      stripeWebhookFile = file;
      return;
    }

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
      .replace(/\.(js|ts)$/, "")
      .replace(/index$/, "");

    app.all(endpoint, asyncHandler(func));
  });

if (stripeWebhookFile) {
  const requiredFile = require(`./${stripeWebhookFile}`);

  let func;
  if (typeof requiredFile === "function") {
    func = requiredFile;
  } else if (typeof requiredFile.default === "function") {
    func = requiredFile.default;
  }

  if (func) {
    app.post(
      "/stripe-webhook",
      bodyParser.raw({ type: "application/json" }),
      func
    );
  }
}

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(500).json({
      error: err,
    });
  }
});

app.get("/healthz", (req, res) => {
  res.send("ok");
});

app.listen(process.env.PORT || 3010, () => console.log("Server ready"));
