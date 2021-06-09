
const app = require('./app.js');
const db = require('./db/index.js');

const PORT  = process.env.PORT || 3000;


// ------------------------------- start server -------------------------------


db.connect().then(() => {
  app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
  });
})
