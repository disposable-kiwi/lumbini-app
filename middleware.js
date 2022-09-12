const jwt = require('jsonwebtoken');

const withAuth = function(req, res, next) {
  let requestHeaders = req.headers.authorization;
  //check if there is any headers present and check if authorization header is included
  if (requestHeaders && requestHeaders.startsWith("Bearer ")) {
    try {
      //grab the token from the headers exluding the Bearer part
      let token = requestHeaders.split(" ")[1];
      //check if the token provided is valid
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded.userId;
      next();
    } catch {
      res.status(401).json({ error: "Not Authorized / Incorrect Token" });
    }
  } else {
    res.status(400).json({ error: "Missing Token (ToT)" });
  }
}

module.exports = withAuth;