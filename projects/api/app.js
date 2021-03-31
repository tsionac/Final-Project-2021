
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



// ------------------------------- aplication specific objects -------------------------------
const editCache = new ActiveEdits();


// ------------------------------- HTTP defenitions -------------------------------

const PORT = 3000;

app.get('/records', (req, res) => {
    Record.find({}).then((records) =>{
        res.send(records);
    });
})

app.post('/records', (req, res) => {
    let userID = req.body.userID;
    let componentID = req.body.componentID;
    let editStart = req.body.editStart;
    let editEnd = req.body.editEnd;

    //user start the edit, end time is unkown yet, keep in cache, not in DB
    if(editEnd === undefined){
      editCache.startEdit(userID, componentID,editStart);
      res.send({userID, componentID,editStart});
      return;
    }

    if(editStart === undefined){
      editStart = editCache.endEdit(userID, componentID);

      let newRecord = new Record({
        userID,
        componentID,
        editStart,
        editEnd,
      });


      newRecord.save().then((recordDoc) => {
        res.send(recordDoc);
      });
    }


});

app.patch('/records/:id', (req, res) => {
    let id = req.params.id;

    Record.findOneAndUpdate({_id: id}, { $set: req.body})
    .then(() => { res.sendStatus(200);}); //ok
});


app.delete('/records/:id', (req, res) => {
    let id = req.params.id;

    Record.findOneAndRemove({_id: id})
    .then((removed) => { res.send(removed)});
});

/**
 * for debugging only- DELETE later
 */
app.delete('/all', (req, res) => {
    Record.deleteMany({})
    .then(() => { res.sendStatus(200);});
});






//start the server
app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
});

