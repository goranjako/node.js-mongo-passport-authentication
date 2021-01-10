"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _user = _interopRequireDefault(require("../models/user"));

var jwt = require('jsonwebtoken');

var Auth = /*#__PURE__*/function () {
  function Auth() {
    (0, _classCallCheck2["default"])(this, Auth);
  }

  (0, _createClass2["default"])(Auth, [{
    key: "register",
    value: function register(req, res) {
      if (!req.body.fullName || !req.body.password) {
        res.json({
          success: false,
          msg: 'Please pass username and password.'
        });
      } else {
        var newUser = new _user["default"]({
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password
        }); // save the user

        newUser.save(function (err) {
          if (err) {
            return res.json({
              success: false,
              msg: 'Username already exists.'
            });
          }

          res.json({
            success: true,
            msg: 'Successful created new user.'
          });
        });
      }
    }
  }, {
    key: "login",
    value: function login(req, res) {
      _user["default"].findOne({
        email: req.body.email
      }, function (err, user) {
        if (err) throw err;

        if (!user) {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. User not found.'
          });
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN, {
                expiresIn: '10m'
              }); // return the information including token as JSON

              res.json({
                success: true,
                token: token
              });
            } else {
              res.status(401).send({
                success: false,
                msg: 'Authentication failed. Wrong password.'
              });
            }
          });
        }
      });
    }
  }]);
  return Auth;
}();

;

var _default = new Auth();

exports["default"] = _default;