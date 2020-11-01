"use strict";

var express = require('express');

var bcrypt = require('bcrypt');

var User = require('../models/User');

var router = express.Router();
router.post('/register', function _callee(req, res) {
  var _req$body, username, nationalID, password, confirmPassword, studentRegex, nationalIDRegex, dup, passwordHash, nationalIDHash, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, nationalID = _req$body.nationalID, password = _req$body.password, confirmPassword = _req$body.confirmPassword; //regex is unfinished, regex (Regular Expression) is a type of tool used to validate strings.
          //Student ID regex

          studentRegex = RegExp('//g'); //National ID

          nationalIDRegex = RegExp('//g');
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 5:
          dup = _context.sent;

          if (!dup) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.render('register', {
            message: 'This username already exist!'
          }));

        case 10:
          if (!studentRegex.test(username)) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.render('register', {
            message: 'Invalid student id!'
          }));

        case 14:
          if (!nationalIDRegex.test(nationalID)) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", res.render('register', {
            message: 'Invalid student id!'
          }));

        case 18:
          if (!(password !== confirmPassword)) {
            _context.next = 20;
            break;
          }

          return _context.abrupt("return", res.render('register', {
            message: "Password does not match!"
          }));

        case 20:
          //Securing password
          passwordHash = bcrypt.hashSync(password, 10); //Securing national ID

          nationalIDHash = bcrypt.hashSync(nationalID, 10); //Storing new registration

          user = new User({
            username: username,
            password: passwordHash,
            nationalID: nationalIDHash,
            voted: false
          });
          _context.next = 25;
          return regeneratorRuntime.awrap(user.save());

        case 25:
          //redirect to home page
          res.render('notvoted', {
            user: user
          });

        case 26:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/login', function _callee2(req, res) {
  var _req$body2, username, password, user, isCorrect;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password; //if the user did not type in username or password

          if (!(!username || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.render('register', {
            message: "Please try again"
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 5:
          user = _context2.sent;

          if (!user) {
            _context2.next = 15;
            break;
          }

          //check if the password matches the corresponding username in the database
          isCorrect = bcrypt.compareSync(password, user.password); //if correct, redirect the user to homepage

          if (!isCorrect) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.render('notvoted', {
            user: user
          }));

        case 12:
          return _context2.abrupt("return", res.render('login', {
            message: 'Username or Password Incorrect!'
          }));

        case 13:
          _context2.next = 16;
          break;

        case 15:
          return _context2.abrupt("return", res.render('login', res.render('login', {
            message: 'Username does not exist'
          })));

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;