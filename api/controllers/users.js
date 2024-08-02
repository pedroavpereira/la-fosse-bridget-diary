const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const login = async (req, res) => {
  try {
    const data = req.body;

    const user = await User.findByUsername(data.username);

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) throw new Error("Unable to authenticate");

    console.log("BEFORE SINGING");
    jwt.sign(
      { username: user.username },
      process.env.SECRET_TOKEN,
      {
        expiresIn: 3600,
      },
      (err, data) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, error: "Error generating token" });
        } else {
          res.status(200).json({ success: true, data: { token: data } });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const signup = async (req, res) => {
  const data = req.body;
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

    data.password = await bcrypt.hash(data.password, salt);

    const newUser = await User.create(data);

    jwt.sign(
      { username: newUser.username },
      process.env.SECRET_TOKEN,
      {
        expiresIn: 3600,
      },
      (err, data) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, error: "Error generating token" });
        } else {
          res.status(200).json({ success: true, data: { token: data } });
        }
      }
    );
  } catch (err) {
    res.status(404).send({ success: false, error: err });
  }
};

module.exports = { login, signup };
