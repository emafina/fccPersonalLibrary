/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Book = require('../models/book.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    

    // 2. You can send a POST request to /api/books with title 
    // as part of the form data to add a book. The returned response 
    // will be an object with the title and a unique _id as keys. 
    // If title is not included in the request, the returned response 
    // should be the string missing required field title.
    .post(function (req, res){
      const {title} = req.body;
      //response will contain new book object including atleast _id and title
      const newBook = new Book({title});
      newBook
        .save()
        .then((doc)=>{
          console.log(doc);
          res.json(doc.toJSON());    
        })
        .catch((err)=>{
          res.text('missing required field title');
        });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
