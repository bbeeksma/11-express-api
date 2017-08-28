'use strict';

const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

module.exports = exports = {};


const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const unlinkFileAsync = promisify(fs.unlink);

function Workout(exercise, weight, set, rep){
  this.id = uuidv4();
  this.exercise = exercise;
  this.weight = weight;
  this.set = set;
  this.rep = rep;
}


function promisify(fn){
  return(...args) =>{
    return new Promise((resolve,reject) =>{
      fn(...args
        ,(err,data) => {
          if(err) return reject(err);
          resolve(data);
        });
    });
  };
}


function ensureDirectoryExistance(filePath){
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistance(dirname);
  fs.mkdirSync(dirname);
}


exports.createItem = function(schemaName, exercise, weight, set, rep) {
  console.log(exercise);
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!exercise || !weight || !set || !rep) return Promise.reject(new Error('all expecise params required'));
  let item = new Workout(exercise,weight,set,rep);

  const filePath = `${__dirname}/../data${schemaName}/${item.id}.json`;
  ensureDirectoryExistance(filePath);

  return writeFileAsync(filePath, JSON.stringify(item))
    .then(() => item);
};


exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));


  const filePath = `${__dirname}/../data${schemaName}/${id}.json`;
  if(!fs.existsSync(path.dirname(filePath)))  return Promise.reject(new Error('schema not found'));

  return readFileAsync(filePath)
    .then(data => {
      return JSON.parse(data.toString());
    });

  /*
  if (!id){
    var idArray = [];
    for (var x in schema){
      idArray.push(schema[x].id);
    }
    resolve({ids: idArray});
  }
  else{
    var item = schema[id];
    if (!item) return reject(new Error('item not found'));
    resolve(item);
  }
  */

};

exports.killItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  const filePath = `${__dirname}/../data${schemaName}/${id}.json`;
  console.log(filePath);
  if(!fs.existsSync(path.dirname(filePath)))  return Promise.reject(new Error('schema not found'));

  return unlinkFileAsync(filePath)
    .then(() => {
      return;
    });
};
