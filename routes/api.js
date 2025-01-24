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
    //  3. You can send a GET request to /api/books and 
    //  receive a JSON response representing all the books. 
    // The JSON response will be an array of objects with 
    // each object (book) containing title, _id, and 
    // commentcount properties.

    // -- GET --
    // ---------
    .get(async function (req, res){
      res.json(await Book.getList());
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    // 2. You can send a POST request to /api/books with title 
    // as part of the form data to add a book. The returned response 
    // will be an object with the title and a unique _id as keys. 
    // If title is not included in the request, the returned response 
    // should be the string missing required field title.
    // -- POST --
    // ----------
    .post(function (req, res){
      const {title} = req.body;
      //response will contain new book object including atleast _id and title
      const newBook = new Book({title});
      newBook
        .save()
        .then((doc)=>{
          res.json(doc.getPostLog());    
        })
        .catch((err)=>{
          res.send('missing required field title');
        });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });

  app.route('/api/books/:id')
    // 4. You can send a GET request to /api/books/{_id}
    // to retrieve a single object of a book containing 
    // the properties title, _id, and a comments array (empty array 
    // if no comments present). If no book is found, return the string 
    // no book exists.
    // -- GET
    .get(async function (req, res){
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let bookid = req.params.id;
      let reqBook;
      try {
        reqBook = await Book.findById(bookid);
      } catch (error) {}
      if(!reqBook){
        res.send('no book exists');
      };
      res.json(reqBook.toJSON({virtuals:false}));
    })
    // 5. You can send a POST request containing comment as the form body 
    // data to /api/books/{_id} to add a comment to a book. The returned 
    // response will be the books object similar to GET /api/books/{_id} 
    // request in an earlier test. If comment is not included in the request,
    // return the string missing required field comment. If no book is found,
    // return the string no book exists.
    // -- POST
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(!comment){res.send('missing required field comment')};
      let reqBook;
      try {
        reqBook = await Book.findById(bookid)  
      } catch (error) {};
      if(!reqBook){res.send('no book exists')};
      reqBook.comments.push(comment);
      await reqBook.save();
      res.json(reqBook.toJSON({virtuals:false}));
      //json res format same as .get
    })
    // -- DELETE
    // 6. You can send a DELETE request to /api/books/{_id} 
    // to delete a book from the collection. The returned response 
    // will be the string delete successful if successful. If no 
    // book is found, return the string no book exists.
    .delete(async function(req, res){
      //if successful response will be 'delete successful'
      let bookid = req.params.id;
      let foundBook;
      try {
        foundBook = await Book.findByIdAndDelete(bookid);
      } catch (error) {};
      if(!foundBook){
        res.send('no book exists');
      };
      res.send('delete successful');
    });
  
};
