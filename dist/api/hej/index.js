"use strict";
module.exports = (req, res) => {
    const { name = "World" } = req.query;
    res.send(`Time to save the world! ${name}!`);
};
