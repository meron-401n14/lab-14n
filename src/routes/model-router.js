'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('../middleware/model-finder.js');
const PreventAuthErrors = require('../middleware/prevent-auth-errors.js');
const auth = require('../middleware/auth.js');

router.param('model', modelFinder.load);

/**
 * this route will print out details about a model
 * @route GET /model/:model
 * @group model/:model - data printed about a specific model
 * @param {string}  : model - The name of the model in our database
 * @security 
 */

router.get('/model/:model', PreventAuthErrors, auth,  async (req, res, next) => {
  if(!req.model) next({status: 404, msg: 'Cannot find requested model'});

  let records = await req.model.getFromField({});
  let recordCount = records.length;
  

  //console.log(records);

  let resData = {
    model: req.params.model,
    count: recordCount,
  };

  if(req.user && req.user.role === 'admin') resData.records = records;
  res.status(200).json(resData);
});

/**
 * this route returns a single record in a specific model
 * @route GET /model/:model/:id
 * @group model/:model - DAta printed about a specific model
 * @param {string} model.params.required
 */
router.get('/model/:model/:id', (req, res, next) => {
  // only admins can access this route
  // auth is required 

  if(req.user.role === 'admin')
    let record = req.model.get(req.params.id);
    if(record && record._id)
    res.status(200).json(record);
  else 
  next({status: 400, msg: 'Unable to find record'});
}
else {
  next({status: 403, msg: 'Forbidden to access this route'})
}
  // send error
});

module.exports = router;
