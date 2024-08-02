const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Unable to authenticate" });
  }
  //   guard clause

  jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, error: "Unable to authenticate" });
    }

    req.user_id = data.user_id;
    next();
  });
}

module.exports = authenticator;
