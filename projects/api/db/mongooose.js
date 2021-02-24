//Handling connection to mongoDB

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const host = 'localhost';
const hostPort = 27017;


//conenction
mongoose.connect(`mongodb://${host}:${hostPort}`, {useNewUrlParser: true, useUnifiedTopology:true}).then(() =>{
    console.log('connected succesfully to mongoDB');
}).catch((e) => {
    console.log('ERROR while connecting to mongoDB : ' + e);
    //console.log(e);
})

//this is here to prevent depection warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


module.exports = {
    mongoose
}; 