
// ------------------------------- general modules imports -------------------------------

const express = require('express');
const app = express();

const {mongoose} = require('./db/mongooose');
const bodyPaeser = require('body-parser');

//load modules
const { Record } = require('./db/modules');

//load midleware
app.use(bodyPaeser.json());

// here to fix CORS error
// Source : https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });






// ------------------------------- aplication specific imports -------------------------------
const {ActiveEdits} = require('./cache');
const ApiError      = require('./errorHandling/ApiError');



// ------------------------------- aplication specific objects -------------------------------
const editCache = new ActiveEdits();


// ------------------------------- HTTP defenitions -------------------------------

const PORT  = 3000;
const ok    = 200;





//records

// get ALL record.
// WARNING: extremly dangerous, remove on luanch.
app.get('/records', (req, res, next) => {
    Record.find({}).then((records) =>{
      res.send(records);
    })
    .catch(next);
})

// pots a new record
// if recived undefinded editEnd  , asume the edit has just began, save info on it to the ram, untl the edit has finished.
// if recived undefinded editStart, asume the edit has just ended, serch for the start time and save the record to the db.
app.post('/records', (req, res, next) => {
    let companyID   = 'figureoutLater';
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

// delete **ALL*** specofic recird with a given id
// WARNING: super-extremly-mega-ultra dangerous, used for debug only, remove on luanch.
app.delete('/all', (req, res, next) => {
    Record.deleteMany({})
    .then(() => { res.sendStatus(ok);})
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
