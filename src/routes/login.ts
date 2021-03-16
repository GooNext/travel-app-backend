const loginRouter = require('express').Router();
const jwtLogin = require('jsonwebtoken');
const bcryptLogin = require('bcryptjs');
const UserModelLogin = require('../models/user.model')

const getLoginPasswordUser = async (login:any) => {
  const user = await UserModelLogin.findOne({ login });
  return user;
  };
  
loginRouter.route('/').post(async (req:any, res:any, next:any) => {
  try {
    const user = await getLoginPasswordUser(req.body.login);
    if (user && req.body.login && req.body.password) {
        bcryptLogin.compare(req.body.password, user.password, (err:any, result:any) => {
        if (result) {
          const token = jwtLogin.sign(
            {
              userId: user.id,
              login: user.login,
              name: user.name
            },
            process.env.JWT_SECRET_KEY,
            { algorithm: 'HS256' },
            {
              expiresIn: '1h'
            }
          );
          return res.status(200).send({ token });
        } else {
          return res.status(400).send({error: 'Invalid user or password'});
        }
      });
    } else {
      res.status(400).send({error: 'Invalid user or password'});
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = loginRouter;