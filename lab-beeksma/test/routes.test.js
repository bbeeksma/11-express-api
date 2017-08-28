'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');



describe('Routes', function (){
  it('should return routed for /', function (done){
    request.get('/')
      .expect(200)
      .expect('routed')
      .expect('content-type', 'text/plain')
      .expect(res => {
        expect(res.files).to.be.undefined;
      })
      .end(done);
  });

  it('should return Not Found for GET missing path', function (done){
    request.get('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });

  it('should return Not Found for POST missing path', function (done){
    request.post('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });

  it('should return Not Found for PUT missing path', function (done){
    request.put('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });

  it('should return Not Found for DELETE missing path', function (done){
    request.delete('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });
});

describe('Simple Resource', function (){
  var note = null;

  describe('POST /note', function() {
    it('should return bad request if no body', function (done){
      request.post('/note')
        .expect(400)
        .expect('Bad Request : Error: expected item')
        .expect('content-type', 'text/plain')
        .end(done);
    });
    it('should return bad request if body is not valid JSON', function (done){
      request.post('/note')
        .send('I am not JSON')
        .expect(400)
        .expect('Bad Request : Error: expected item')
        .expect('content-type', 'text/plain')
        .end(done);
    });
    it('should save body', function (done){
      request.post('/note')
        .send({note: 'this is a note'})
        .expect(200)
        .expect(res =>{
          expect(res.body.note).to.equal('this is a note');
          expect(res.body.id).to.not.be.empty;
          note = res.body;
        })
        .end(done);
    });
  });

  describe('GET /note', function (){
    it('should return bad resuest if no ID sent', function (done){
      request.get(`/note`)
        .expect(400)
        .end(done);
    });
    /*
    it('should return array of IDs in body if no ID sent', function (done){
      request.get(`/note`)
        .expect(200)
        .expect(res => {
          expect(res.body.ids).to.be.a('array');
          expect(res.body.ids[0]).to.equal(note.id);
        })
        .end(done);
    });
    */
    it('should return a note if ID supplied', function (done){
      request.get(`/note?id=${note.id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.note).to.equal(note.note);
          expect(res.body.id).to.equal(note.id);
        })
        .end(done);
    });
  });

  describe('DELETE /note', function (){
    it('should return bad request if no ID sent', function (done){
      request.delete(`/note`)
        .expect(400)
        //.expect('Bad Request : Error: expected id')
        .expect('content-type', 'text/plain')
        .end(done);
    });

    it('should return a 204 status with nothing in body if ID supplied', function (done){
      request.delete(`/note?id=${note.id}`)
        .expect(204)
        .expect(res => {
          expect(res.body).to.be.empty;
        })
        .end(done);
    });
    it('should not find a note for the ID we just deleted', function (done){
      request.get(`/note?id=${note.id}`)
        .expect(400)
        .end(done);
    });
  });
});
