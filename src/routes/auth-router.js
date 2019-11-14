'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

/**
 * 
 */

router.post('/signup', (req, res, next) => {
  res.status(200).json({token: 'Bearer' + req.token});
});









/**
 * this function allows users to sign in using a username and passwrd
 * @rote POST /signin
 * @group auth - Signin/Signup routes
 * @param {string} authorization.headers.required - A basic auth string 
 * containing the username and password
 * @returns ?
 */
router.post('/signin',  auth,   (req, res, next) => {
  //req.headers.authorization
  // can be 100% in auth middleware
  // 50 -50 in auth and this route 

  res.status(200).json({token:'Bearer' + req.token});
});

module.exports = router;
