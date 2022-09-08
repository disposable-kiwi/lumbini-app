const jwt = require('jsonwebtoken');

const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  console.log(req.cookies);
  console.log(req.userId);
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        res.status(401).json({alert:'Unauthorized: Invalid token'});
      } else {
        console.log(decoded.userId);
        req.userId = decoded.userId;
        next();
      }
    });
  }
}

module.exports = withAuth;