'use strict';

const {expect} = require('chai');
const storage = require('../model/storage');

describe('storage', function(){
  const schemaName = '/people';
  const itemToSave = {id:12,name:'keith'};
  describe('create item', function(){
    it('should save item',function(done){
      storage.createItem(schemaName,itemToSave)
        .then(saveItem => {
          expect(saveItem).to.deep.equal(itemToSave);
          done();
        });
    });
  });
  describe('fetchItem',function(){
    it('should fetch item', function(done){
      storage.fetchItem(schemaName, itemToSave.id)
        .then(fetchedItem =>{
          expect(fetchedItem).to.deep.equal(itemToSave);
          done();
        })
        .catch(done);
    });
    it('should fail with bad schema', function(done){
      storage.fetchItem('missing', itemToSave.id)
        .catch(err =>{
          expect(err).to.not.be.null;
          done();
        });
    });
  });
});
