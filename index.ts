import { Request, Response, NextFunction } from "express";
import express from "express";
import glob from "glob";
import asyncHandler from "express-async-handler";
import morgan from "morgan";
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.disable("x-powered-by");

glob
  .sync("api/**/*.{js,ts}", { ignore: ["api/node_modules/**"] })
  .forEach((file) => {
    let func;
    const requiredFile = require(`./${file}`);

    if (typeof requiredFile === "function") {
      func = requiredFile;
    } else if (typeof requiredFile.default === "function") {
      console.log("default is function");
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

interface Error {
  output?: {
    payload?: Record<string, unknown>;
    statusCode?: number;
  };
  details?: [
    {
      message?: string;
    }
  ];
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(500).json({
      fail: "yep",
    });
  }
});

app.listen(process.env.PORT || 3010, () => console.log("Server ready"));
