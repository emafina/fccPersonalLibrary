/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    let insertedId;

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .keepOpen()
          .post('/api/books')
          .send({
            title:'Il nome della rosa'
          })
          .end(function(err,res){
            console.log(res.body);
            assert.equal(res.body.title,'Il nome della rosa');
            insertedId = res.body._id;
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .keepOpen()
           .post('/api/books')
           .send({
            no_title:'Il nome della rosa'
           })
           .end(function(err,res){
            assert.equal(res.text,'missing required field title');
            done();
           });
      });
      
    });

    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get('/api/books')
          .end(function(err,res){
            assert.isArray(res.body);
            if(res.body.length>=1){
              assert.property(res.body[0],'_id');
              assert.property(res.body[0],'title');
              assert.property(res.body[0],'commentcount');
            };
            done();
          })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get('/api/books/124335n1')
          .end(function(err,res){
            assert.equal(res.text,'no book exists');
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get(`/api/books/${insertedId}`)
          .end(function(err,res){
            assert.property(res.body,'title');
            done();
          });
      });
      
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai
          .request(server)
          .keepOpen()
          .post(`/api/books/${insertedId}`)
          .send({comment:'phylosophical'})
          .end(function(err,res){
            assert.property(res.body,'_id');
            done();
          })
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai
          .request(server)
          .keepOpen()
          .post(`/api/books/${insertedId}`)
          .send({})
          .end(function(err,res){
            assert.equal(res.text,'missing required field comment');
            done()
          })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai
          .request(server)
          .keepOpen()
          .post('/api/books/q4gq34gq3048t')
          .send({comment:'phylosophical'})
          .end(function(err,res){
            assert.equal(res.text,'no book exists');
            done();
          });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
          .request(server)
          .keepOpen()
          .delete(`/api/books/${insertedId}`)
          .end(function(err,res){
            assert.equal(res.text,'delete successful');
            done();
          })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
          .request(server)
          .keepOpen()
          .delete('/api/books/qwo4gq34g')
          .end(function(err,res){
            assert.equal(res.text,'no book exists');
            done();
          });
      });

    });

  });

});
