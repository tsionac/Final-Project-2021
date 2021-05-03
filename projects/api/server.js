
const app = require('./app.js');
const db = require('./db/index.js');

const { Manager } = require('./db/modules');

const PORT  = 3000;


// ------------------------------- start server -------------------------------


db.connect().then(() => {
  app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);


    //make usre there is an admin to the system
    let userID = 'Admin';
    let companyID = 'Admin';
    let password = '12345678';

    let newManager = new Manager( {
      companyID,
      userID,
      password
    });

    Manager.findOneAndRemove({userID})
    .then((removed) => {
      newManager.save().then( (adminDoc) => {
        console.log(`The admin has beed successfully set :  ${adminDoc}`);
      }).catch((e) =>  { console.log(`FATAL : Admin was not set!`);});
    })
    .catch((e) => {});

  });
})
