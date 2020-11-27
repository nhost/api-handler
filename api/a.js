export default function (req, res) {
  const { name = "World" } = req.query;
  res.send(`Time to save the world! ${name}!`);
}

export function sub(a, b) {
  return a - b;
}
