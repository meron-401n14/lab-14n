'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roles = require('./roles-schema');



/**
 * The schema definition for a user record
 * @type {mongoose.Schema}
 */
const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: { type: String, default: 'user', enum: ['admin', 'editor', 'user'] },
},
{ toObject: {virtuals:true}, toJSON: {virtuals: true}},
);

users.virtual('virtual_role', {
  ref: 'roles',
  localField: 'role',
  foreignField: 'role',
  justOne: true,

});

users.pre('findOne', function() {
  this.populate('virtual_role');
});
/**
 * this function compares a plaintext password with the stored hashed password with the stored hased
 * password for an individual user record (`this` refers to an individual )
 * for an individua; user record (`this` referes to an indevidual )record
 * @param string paintext 
 */

users.methods.comparePasswords = async function(plaintextPassword) {
  return   await bcrypt.compare(plainTextPassword, this.password);

};

users.methods.generateToken  = function(timeout){
console.log('Current Time')
  let expiry = Math.floor(Date.now() /1000) + 60*60;
  if(parseInt(timeout))
  expiry = Math.floor(Date.now())
  
  return jwt.sign({
    data: {
      id: this._id,
    },
    exp: expiry, 
  }, process.env.JWT_SECRET);
};

users.methods.can =  function(capability) {
// check user (this) > virtual_role > capabilites > if the parameter exisits in this array

return this.virtual_role.capabilities.includes(capablity);
}

users.pre('save', )

/**
 * Exporting a mongoose model generated from the above schema, statics, methods and middleware
 * @type {mongoose model}
 */
module.exports = mongoose.model('users', users);
