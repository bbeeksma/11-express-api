'use strict';

const {expect} = require('chai');
const storage = require('../model/storage');

describe('storage', function(){
  const schemaName = '/workout';
  const itemToSave = {exercise: 'benchpress', weight: '135', set: '5', rep: '10'};
  var savedItem = {};
  describe('create item', function(){
    it('should save item',function(done){
      storage.createItem(schemaName,itemToSave.exercise,itemToSave.weight,itemToSave.set,itemToSave.rep)
        .then(saveItem => {
          expect(saveItem.exercise).to.equal(itemToSave.exercise);
          expect(saveItem.weight).to.equal(itemToSave.weight);
          expect(saveItem.set).to.equal(itemToSave.set);
          expect(saveItem.rep).to.equal(itemToSave.rep);
          savedItem = saveItem;
          done();
        })
        .catch(done);
    });
  });
  describe('fetchItem',function(){
    it('should fetch item', function(done){
      storage.fetchItem(schemaName, savedItem.id)
        .then(fetchedItem =>{
          expect(fetchedItem).to.deep.equal(savedItem);
          done();
        })
        .catch(done);
    });
    it('should fail with bad schema', function(done){
      storage.fetchItem('missing', savedItem.id)
        .catch(err =>{
          expect(err).to.not.be.null;
          done();
        });
    });
  });
});
