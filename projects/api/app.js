// Many part on the db project was inspired by the folowing youtube series tuturial :
// https://www.youtube.com/watch?v=V-CeWkz1MNQ&list=PLIjdNHWULhPSZFDzQU6AnbVQNNo1NTRpd




// ------------------------------- general modules imports -------------------------------

const express = require('express');
const app = express();

const {mongoose} = require('./db/mongooose');
const bodyPaeser = require('body-parser');

//load modules
const { Record, Manager } = require('./db/modules');



// ------------------------------- middlewares -------------------------------

//heders field for authentication tokens
const refreshHeader = 'x-refresh-token';
const accessheader = 'x-access-token';


//load middleware
app.use(bodyPaeser.json());

// here to fix CORS error
// Source : https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// verify refresh token middleware (and by that verifing the session)
/*app.use((req, res, next) => {
  //grab the refresh token from the request header
  let refreshToken = req.header(refreshHeader);

  //grab the _id token from the request header
  let _id = req.header('_id');

  Manager.findByIdAndToken(_id, refreshToken).then((manager) => {
      if(!manager){
        // could not find manager
        return Promise.reject({'error':'manager not found. does the _id and token are valid?'});
      }

      // if the code reached this place, than the manger was found, which means the session is valid
      //req.manager_id = manager._id;
      //req.refreshToken = refreshToken;

      //let isSessionValid = false;

      //we will now check if the session as expried
      //manager.sessions.array.forEach(session => {
        //if(session.token === refreshToken){
          // this is the current session record

          //Manager.hasRefreshTokenExpire(session.expiresAt)
          //if(true) { // check if the session has expired
            //has not expired
          //  isSessionValid = true;
          //}
        //}
      //});
  });
}); */


// ------------------------------- aplication specific imports -------------------------------
const {ActiveEdits} = require('./cache');
const ApiError      = require('./errorHandling/ApiError');



// ------------------------------- aplication specific objects -------------------------------
const editCache = new ActiveEdits();


// ------------------------------- HTTP defenitions -------------------------------

const PORT  = 3000;
const ok    = 200;





// ------------ records ------------

// get ALL record.
// WARNING: extremly dangerous, remove on luanch.
app.get('/records', (req, res, next) => {
    Record.find({}).then((records) =>{
      res.send(records);
    })
    .catch(next);
});

// pots a new record
// if recived undefinded editEnd  , asume the edit has just began, save info on it to the ram, untl the edit has finished.
// if recived undefinded editStart, asume the edit has just ended, serch for the start time and save the record to the db.
app.post('/records', (req, res, next) => {
    let companyID   = 'figureoutLater'; //TODO
    let userID      = req.body.userID;
    let componentID = req.body.componentID;
    let actionID    = req.body.actionID;
    let editStart   = req.body.editStart;
    let editEnd     = req.body.editEnd;

    // illegal arguments
    if((companyID === undefined || userID === undefined || componentID === undefined || actionID === undefined) || (editStart === undefined && editEnd === undefined)){
      next(ApiError.badRequest('not all requred paramaters were given.'));
      return;
    }

    //user start the edit, end time is unkown yet, keep in cache, not in DB
    if(editEnd === undefined){
      editCache.startEdit(userID, componentID,editStart);
      res.send({userID, componentID,editStart});
      return;
    }

    // user finished editing, save recird to the db
    if(editStart === undefined){
      editStart = editCache.endEdit(userID, componentID);

      let newRecord = new Record({
        companyID,
        userID,
        componentID,
        actionID,
        editStart,
        editEnd,
      });


      newRecord.save().then((recordDoc) => {
        res.send(recordDoc);
      })
      .catch(next);
    }


});

// recive one specofic recird with a given id
// WARNING: extremly dangerous, remove on luanch.
app.patch('/records/:id', (req, res, next) => {
    let id = req.params.id;

    Record.findOneAndUpdate({_id: id}, { $set: req.body})
    .then(() => { res.sendStatus(ok);})
    .catch(() => { next(ApiError.internal('error accured while updating record. is the id correct? was all paramaters given?'))});

});


// delete one specofic recird with a given id
// WARNING: extremly dangerous, remove on luanch.
app.delete('/records/:id', (req, res, next) => {
    let id = req.params.id;

    Record.findOneAndRemove({_id: id})
    .then((removed) => { res.send(removed)})
    .catch(() => { next(ApiError.internal('error accured while deleting the record. is the id correct?'))});
});

// delete **ALL*** records
// WARNING: super-extremly-mega-ultra dangerous, used for debug only, remove on luanch.
app.delete('/records', (req, res, next) => {
    Record.deleteMany({})
    .then(() => { res.sendStatus(ok);})
    .catch(next);
});





// ------------ managers ------------

/**
 * post a new manager
 * i.e. signup
 */
app.post('/managers', (req, res, next) => {
  let body = req.body;

  let newManager = new Manager(body);

  //TODO : this sign in also do login, not relevent for our project. change later when I undrstand it better.

  newManager.save().then( (managerDoc) => {
    return newManager.createSession();
  }).then((refreshToken) => {
    // session created succesfully, and the refresh token was returned, so niw we need to generet JWT fo the manager.
    return newManager.generateAccessAuthenticationToken().then((accessToken) => {
      // the access token was crerated succesfully, returning an object containig the two tokens.
      return {accessToken, refreshToken};
    });
  }).then((authentocationTokens) => {
    // retun a response to the user
    res
      .header(refreshHeader, authentocationTokens.refreshToken)
      .header(accessheader, authentocationTokens.accessToken)
      .send(newManager);
  }).catch((e) =>  { next(ApiError.internal('failed to create new user.\n' + e));});

});


/**
 * login
 */
app.post('/managers/login', (req, res, next) => {
  let userID = req.body.userID;
  let password = req.body.password;

  Manager.findByCredentials(userID, password).then((manager) => {
    return manager.createSession().then((refreshToken) => {
      // session was created succesfully, recived refresh token, now need to generate access token

      return manager.generateAccessAuthenticationToken().then((accessToken) => {
        // the access token was crerated succesfully, returning an object containig the two tokens.
        return {accessToken, refreshToken};
      });
    }).then((authentocationTokens) => {
      // retun a response to the user
      res
        .header(refreshHeader, authentocationTokens.refreshToken)
        .header(accessheader, authentocationTokens.accessToken)
        .send(manager);
    }).catch((e) =>  { next(ApiError.internal('failed to login.\n' + e));});
  });
});

// delete **ALL*** managers
// WARNING: super-extremly-mega-ultra dangerous, used for debug only, remove on luanch.
app.delete('/managers', (req, res, next) => {
  Manager.deleteMany({})
  .then(() => { res.sendStatus(ok);})
  .catch(next);
});

//get info on specific manager
app.get('/managers/:userid', (req, res, next) => {
  let userid = req.params.userid;

  Manager.findOne({'userID':userid}).then((manager) =>{
    res.send(manager);
  })
  .catch(next);
});

/**
 * generate and returns an access token
 */
 app.get('/managers/me/access-token', (req, res, next) => {
  let userid = req.params.userid;

  Manager.findOne({'userID':userid}).then((manager) =>{
    res.send(manager);
  })
  .catch(next);
});



// ------------------------------- push error handler -------------------------------

const errorHandler = require('./errorHandling/error-handler');
app.use(errorHandler);

// uncought error handler - very bad if happands
process.on('uncaughtException', function (err) {
  //TODO : error loger
  console.log("FATAL: Uncought error acurred!!!!!\n" + err.stack);
  console.error();
});








// ------------------------------- start server -------------------------------

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
});

