//Handling connection to mongoDB

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const host = 'localhost';
const hostPort = 27017;
const DB_URI = `mongodb://${host}:${hostPort}`;

const { Manager } = require('../db/modules');

function connect() {
  return new Promise((resolve, reject) => {

    if(process.env.NODE_ENV === 'test') {
      // the code is running as a test.
      // we will not connect to the realse DB, but for a moack DB.
      // This is done becasue testst that change the DB might fail the secind time they will be runned (trying to add an exsisting record)
      // connectin to a mock DB will allow tests to run indefenetly.

      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      // build the schemes
      mockgoose.prepareStorage().then(() => {
        // connect to mongoose normally
        doConnect(resolve, reject);
      });

    } else {
      // run this under normal situation, and a real DB.
      doConnect(resolve, reject);
    }
  })
};

function close() {
  return mongoose.disconnect();
}

function doConnect(resolve, reject) {
  mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology:true})
  .then((res, err) =>{
    if (err) return reject(err);

    console.log('connected succesfully to mongoDB!');


    //make usre there is an admin to the system
    let userID = 'Admin';
    let companyID = 'Admin';
    let password = '12345678';

    let newManager = new Manager( {
      companyID,
      userID,
      password
    });

    // create new admin if does not already exsist
    Manager.exists({userID}).then(exists => {
      if (exists){
        console.log(`Admin already exsists.... doing nothing.`);
        resolve();
      } else {
          //ther in no admin, creating one
        newManager.save().then( (adminDoc) => {
          console.log(`The admin has beed successfully set :  ${adminDoc}`);
          resolve();
        }).catch((e) => { console.log(`FATAL 1 : Admin was not set!`, e);  reject(e);})
      }
    });
  });

};

//this is here to prevent depection warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


module.exports = {
  connect,
  close
};
