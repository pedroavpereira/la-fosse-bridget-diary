const jwt = require("jsonwebtoken");

function authenticator(req, res, next){
    const token = req.headers.get('authorization')

    
    if (!token) {
        res.status(401).json({ success: false, error: "Unable to authenticate" });
      }
    //   guard clause

      jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
        if (err) {
          res.status(401).json({ success: false, error: "Unable to authenticate" });
        }
       
        req.user = data.username;
        next();
       
      });

}


module.exports = authenticator;