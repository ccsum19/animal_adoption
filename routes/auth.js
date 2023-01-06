const jwt = require("jsonwebtoken");
module.exports = function verifyJWT(req, res) {
  const token = req.headers["x-access-token"].split(' ')[1];
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) return res.json({
        isLoggedIn: false,
        message: "Failed to Authenticate"
      });
      req.user = {};
      req.user.username = decoded.username;
      req.user.email = decoded.email;
      return res.json({message: "Sucess", isLoggedIn:true});
    });
  } else {
    return res.json({
      message: "Incorrect Token Given", isLoggedIn: false
    });
  }
}
