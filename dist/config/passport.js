"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _user = _interopRequireDefault(require("../models/user"));

var passportManager = /*#__PURE__*/function () {
  function passportManager() {
    (0, _classCallCheck2["default"])(this, passportManager);
  }

  (0, _createClass2["default"])(passportManager, [{
    key: "initialize",
    value: function initialize() {
      var opts = {
        jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_TOKEN
      };

      _passport["default"].use(new _passportJwt.Strategy(opts, function (payload, done) {
        _user["default"].findOne({
          id: payload.id
        }, function (err, user) {
          if (err) {
            return done(err, false);
          }

          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      }));

      return _passport["default"].initialize();
    }
  }, {
    key: "authenticate",
    value: function authenticate(req, res, next) {
      _passport["default"].authenticate('jwt', {
        session: false
      }, function (err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          if (info.name === "TokenExpiredError") {
            return res.status(401).json({
              message: "Your token has expired."
            });
          } else {
            return res.status(401).json({
              success: false,
              msg: 'Unauthorized.'
            });
          }
        }

        req.user = user;
        return next();
      })(req, res, next);
    }
  }]);
  return passportManager;
}();

var _default = new passportManager();

exports["default"] = _default;