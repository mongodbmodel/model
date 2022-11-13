#!/usr/bin/env node

"use strict";

/**
 * Author
 *  @name Ericson S. Weah  
 *  @email afrosintech@gmail.com
 *  @website https://www.afrosintech.com
 *  @github https://github.com/afrosintech
 *  @gitlab https://gitlab.com/afrosintech
 *  @npm https://www.npmjs.com/~afrosintech
 *  @phone +1.385.204.5167
 *
 * @module MongoDBModel
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc MongoDBModel class
 */

const { MongoClient} = require('mongodb')
 require('dotenv').config()
 const Model = require('app');
class MongoDBModel extends Model {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(MongoDBModel);
    // auto invoke methods1
    this.autoinvoker(MongoDBModel);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(App);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
    /**
   * @name init
   * @function
   *
   *
   * @description makes a database connections using database connection environment variables
   *
   * @return does not return anything
   *
   */
     init() {
      if (!this.collection) this.collection = "users";
      if (!this.url) this.url = `${process.env.DATABASE_URL}`;
      if (!this.uri)
        this.uri = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;
      if (!this.db) this.db = process.env.DATABASE_NAME;
      if(this.db) {
        this.uri = `mongodb://localhost:27017/${this.db}`
        if(this.url){
          this.uri = `${this.url}/${this.db}`
        }
      }
     
  
  
      this.connect = (fn = () => {}) =>
        MongoClient.connect(
          this.url,
          { useUnifiedTopology: true },
          fn
        );
    }
  /**
   * @name autoinvoked
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets the list of methods to be auto invoked
   *
   * @return does not return anything
   *
   */

     autoinvoked() {
      return ['init'];
    }

}

module.exports =  MongoDBModel;
