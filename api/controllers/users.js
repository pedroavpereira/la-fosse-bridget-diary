const db = require("../database/connect");

const login = async (req, res) => {
  const credential = req.body;
  res.status(200).send("login");
};

const signup = async (req, res) => {
  const newUser = req.body;
  res.status(200).send("signup");
};

module.exports = { login, signup };
