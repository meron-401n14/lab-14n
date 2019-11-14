'use strict';
/**
 * this error middleware takes an error and sets the response status and sends 
 * any error data as the response body
 * @param {object} err  - An error which has keys status and msg
 * @return {Error}  -400-500
 * @return {string}   - The error message
 * 
 */

module.exports = (err, req, res, next) => {
  if(err.status)
    res.status(err.status);
  else res.status(500);

  if(err.msg) res.json({error: err.msg});
  else res.json ({error: 'Unkown error'});
  
  //console.log('err!', err);
};
