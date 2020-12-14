"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const glob_1 = __importDefault(require("glob"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const app = express_1.default();
app.use(express_1.default.json());
app.disable("x-powered-by");
// app.use(morgan("tiny"));
glob_1.default
    .sync("api/**/*.js", { ignore: ["api/node_modules/**"] })
    .forEach((file) => {
    let func;
    const requiredFile = require(`./${file}`);
    if (typeof requiredFile === "function") {
        func = requiredFile;
    }
    else if (typeof requiredFile.default === "function") {
        func = requiredFile.default;
    }
    else {
        return;
    }
    const endpoint = file
        .replace(/^api/, "")
        .replace(/\.js$/, "")
        .replace(/index$/, "");
    app.all(endpoint, express_async_handler_1.default(func));
});
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            fail: "yep",
        });
    }
});
app.listen(process.env.PORT || 3010, () => console.log("Server ready"));
