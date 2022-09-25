const tokenGenerator = require('../modules/tokenGenerator');

const auth = async (req, res, next) => {
  console.log('authMW');
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      res.status(401).send({
        message: 'You must provide a JWT',
      });
    }
    else {
      try {
        const verifiedToken = tokenGenerator.verify(token);
        res.locals.userId = verifiedToken.userId;
        
        next();
      } catch (error) {
        if (error.message === 'jwt malformed') {
          res.status(401).send({
            message: 'Your JWT is malformed',
          });
        }
        else if (error.message === 'invalid signature') {
          res.status(401).send({
            message: 'Your JWT is invalid',
          });
        }
        else {
          res.status(401).send(error);
        }
      }
    }
  }
  else {
    res.status(401).send({
      message: 'You do not have the necessary permissions to access this resource',
    });
  }

}

module.exports = auth;