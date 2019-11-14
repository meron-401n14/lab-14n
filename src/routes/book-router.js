'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const Books = require('../models/books-model.js');
const books = new Books();

router.get('/books', auth,  async(req, res, next) => {
  let allbooks = await  books.getFromField({});

  let filteredBooks = [];
  allbooks.forEach(book => {
    if(book.auth.includes(req.user.role))
    filteredBooks.push({title: book.title, author:book.author});
  });
  if(filteredBooks.length)
  res.status(200).json(filteredBooks);
  else  next({ status: 403, msg: 'You cannot access any books!'});

});

router.post('/books', auth, async(req, res, next) => {
  if(req.user.can('create')) {
    try {
    await  books.create()(req.body);
    res.status(200).json('You created a book');
  } catch(e) {
    next({status: 400, msg: e.name});
  else next({status: 403, msg: 'You cannot create a book!'});

});
router.put('/books/:id', auth, async (req, res, next)=>{
  let book = await book.get(req.params.id);

  if(book && book._id){
      let newBookData = {...{
        title: null,
        author: null,
        auth: [], 
       }, ...req.body, };
try{
       await books.update(req.params.id, newBookData)
} catch (e) {
  console.error(e);
  next ({status: 400, })
}
  }else next ({})

  })
router.patch('/books/:id', (req, res, next) => {
  let book = await books.get(req.params.id); 
  if (book && book._id){
    let newBookData = {
      ...{
        title: booktitle,
        author: book.author,
        auth: book.auth,
      },
      ...req.body,
    };
  }
});

module.exports = router;
