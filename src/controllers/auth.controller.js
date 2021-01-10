
import User from "../models/user";
const jwt = require('jsonwebtoken');


class Auth {
register(req, res) {
    if (!req.body.fullName || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
      } else {
        var newUser = new User({
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password
        });
        // save the user
        newUser.save((err) => {
          if (err) {
            return res.json({success: false, msg: 'Username already exists.'});
          }
          res.json({success: true, msg: 'Successful created new user.'});
        });
      }
  };
  
  login(req, res)  {
    User.findOne({
      email: req.body.email
      }, (err, user) => {
        if (err) throw err;
    
        if (!user) {
          res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          // check if password matches
          user.comparePassword(req.body.password,  (err, isMatch) => {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN,{ expiresIn: '10m' });
              // return the information including token as JSON
              res.json({success: true, token:token});
            } else {
              res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }
      });
  };
  
};

export default new Auth();