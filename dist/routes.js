"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setRoutes;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("./config/passport"));

var _auth = _interopRequireDefault(require("./controllers/auth.controller"));

var _users = _interopRequireDefault(require("./controllers/users"));

var _require = require('./config/verifi'),
    validateRegistrationBody = _require.validateRegistrationBody,
    validateLoginBody = _require.validateLoginBody,
    validate = _require.validate;

function setRoutes(app) {
  var router = _express["default"].Router();

  router.route('/register').post(validateRegistrationBody(), validate, _auth["default"].register);
  router.route('/login').post(validateLoginBody(), validate, _auth["default"].login);
  router.route('/user').get(_passport["default"].authenticate, _users["default"].getAll);
  router.route('/user/:id').put(_passport["default"].authenticate, _users["default"].put);
  router.route('/user/:id')["delete"](_passport["default"].authenticate, _users["default"]["delete"]);
  app.use('/', router);
}