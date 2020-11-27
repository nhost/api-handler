import { add } from "./utils";

module.exports = (req, res) => {
  const { name = "World" } = req.query;
  const sum = add(1, 2);
  res.send(`sum: ${sum}!`);
};
