// testing was inspired bt this youtube tuturial :
// https://www.youtube.com/watch?v=7VNgjfmv_fE

process.env.NODE_ENV = 'test' // tel the enviroment to run in "test mode" (using a mock DB)

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app.js');
const conn = require('../db/index.js');

let Admin_userID = 'Admin';
let Admin_companyID = 'Admin';
let Admin_password = '12345678';

let userComp = 'figureoutLater';
let username = 'manager42';
let userPass = 'i-am-new-user';

let editor_userID = 'test-editor-42';
let editor_componentID = 'test-component-42';
let actionID = 1;
let editStart = new Date();
let editEnd =  new Date();
editEnd.setSeconds(editEnd.getSeconds() + 10); // adding 10 second to simulate an edit


let AdminaccessToken = '';
let useraccessToken = '';

let user__ID = '';
let userRefreshToken = '';


//sleep the ammunt of given milesecond
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


// 2.2
// 2.6
// 3.1
// 3.2
describe('manager tests', () => {


  before((done) => {
    conn.connect()
    .then(() => {


    //login to admin
    request(app).post('/managers/login').send({
      userID: Admin_userID,
      password: Admin_password,
      }).then((res) => {
      const body = res.body;
      const header = res.headers;

      let pre = AdminaccessToken
      AdminaccessToken =  header['x-access-token'];

      expect(res.status).to.equals(200);
      expect(AdminaccessToken).to.not.equals(pre);

      //trying to add new manager
      request(app)
      .post('/managers')
      .set('x-access-token',AdminaccessToken)
      .send({
        companyID : userComp,
        userID: username,
        password: userPass,
      }).then((res) => {
        const body = res.body;
        const header = res.headers;

        expect(res.status).to.equals(200);
        expect(body).to.contain.property('companyID').to.equals(userComp);
        expect(body).to.contain.property('userID').to.equals(username);

        //try to login to the new user
        request(app).post('/managers/login').send({
          userID: username,
          password: userPass,
        }).then((res) => {
          const body = res.body;
          const header = res.headers;

          expect(res.status).to.equals(200);
          expect(header).to.contain.property('x-refresh-token');
          expect(header).to.contain.property('x-access-token');
          expect(body).to.contain.property('_id');


          let pre = useraccessToken
          useraccessToken =  header['x-access-token'];
          userRefreshToken =  header['x-refresh-token'];
          user__ID = body._id;

          expect(AdminaccessToken).to.not.equals(pre);


          //add records on the manager's company
          request(app).post('/records').send({

            userID:editor_userID,
            componentID:editor_componentID,
            actionID,
            editStart,
            //editEnd

          }).then((res) => {
            const body = res.body;

            expect(body).to.contain.property('userID').to.equals(editor_userID);
            expect(body).to.contain.property('componentID').to.equals(editor_componentID);
            expect(body).to.contain.property('editStart');
            expect(+new Date(body.editStart)).to.equals(+new Date(editStart));

            //mark record as done
            request(app).post('/records').send({

              userID:editor_userID,
              componentID:editor_componentID,
              actionID,
              //editStart,
              editEnd

            }).then((res) => {
              const body = res.body;

              expect(body).to.contain.property('userID').to.equals(editor_userID);
              expect(body).to.contain.property('componentID').to.equals(editor_componentID);
              expect(body).to.contain.property('actionID').to.equals(actionID);
              expect(body).to.contain.property('editStart');
              expect(body).to.contain.property('editEnd');

              expect(+new Date(body.editStart)).to.equals(+new Date(editStart));
              expect(+new Date(body.editEnd)).to.equals(+new Date(editEnd));

              done();


              }).catch((err) => done(err)); //6
            }).catch((err) => done(err)); // 5
          }).catch((err) => done(err)); //4
        }).catch((err) => done(err)) //3
      }).catch((err) => done(err)) //2
    }).catch((err) => done(err)); // 1
  });





  after((done) => {
    conn.close()
    .then(() => done())
    .catch((err) => done(err))
  });



   //2.6
   it('Fail, retrive edits in manager\'s company with bas access token.', (done) => {
    request(app)
    .get('/records')
    .set('x-access-token','bad-token-fhreuihf48uie')
    .send({})
    .then((res) => {
      expect(res.status).to.equals(401);
      done();
    }).catch((err) => done(err))
  });

  //2.6
  it('Ok, retrive edits in manager\'s company.', (done) => {
    request(app)
    .get('/records')
    .set('x-access-token',useraccessToken)
    .send({})
    .then((res) => {
      const body = res.body;

      expect(res.status).to.equals(200);
      expect(body.length > 0).to.equals(true) // there is a record.

      let wasFound = false;
      body.forEach(record => {
        let foundThisRound = true;
        foundThisRound = foundThisRound && (record.companyID == userComp);
        foundThisRound = foundThisRound && (record.userID == editor_userID);
        foundThisRound = foundThisRound && (record.componentID == editor_componentID);
        foundThisRound = foundThisRound && (record.actionID == actionID);
        foundThisRound = foundThisRound && (record.actionID == actionID);

        wasFound = wasFound || foundThisRound;
      });

      expect(wasFound).to.equals(true); // this record was retrived

      done();
    }).catch((err) => done(err))
  });







  //3.1
  it('Ok, login in to the manager.', (done) => {

    request(app).post('/managers/login').send({
      userID: username,
      password: userPass,
    }).then((res) => {
      const body = res.body;
      const header = res.headers;

      let pre = useraccessToken
      useraccessToken =  header['x-access-token'];

      expect(res.status).to.equals(200);
      expect(header).to.contain.property('x-refresh-token');
      expect(header).to.contain.property('x-access-token');
      expect(AdminaccessToken).to.not.equals(pre);

      done();
    }).catch((err) => done(err))
  });




  //3.1
  it('Fail, login in to the manager with bad passoword.', (done) => {

    request(app).post('/managers/login').send({
      userID: username,
      password: 'iorufhriuhfriuhf4iurghf 4f9784h fiu4hg rf974yrt47r gf4ilkrfvbrgeikyug34y n0;w.gr',
    }).then((res) => {
      expect(res.status).to.equals(401);
      done();
    }).catch((err) => done(err))
  });




  //3.1
  it('Fail, login in to a bad user name and password.', (done) => {

    request(app).post('/managers/login').send({
      userID: 'h7i8frvghuiyrew gfn435867t84d e5498',
      password: 'iorufhriuhfriuhf4iurghf 4f9784h fiu4hg rf974yrt47r gf4ilkrfvbrgeikyug34y n0;w.gr',
    }).then((res) => {
      expect(res.status).to.equals(401);
      done();
    }).catch((err) => done(err))
  });


  //3.1
  it('Fail, refreshing access token with bad refresh token.', (done) => {
    request(app)
      .get('/managers/me/access-token')
      .set({'x-refresh-token': 'bady-token', '_id':user__ID})
      .send({})
      .then((res) => {
        expect(res.status).to.equals(401);
        done();
      });
  });

  //3.1
  it('Fail, refreshing access token with bad _id.', (done) => {
    request(app)
      .get('/managers/me/access-token')
      .set({'x-refresh-token': userRefreshToken, '_id':'bad-id-oi3jd3oi'})
      .send({})
      .then((res) => {
        expect(res.status).to.equals(401);
        done();
      });
  });


  //3.1
  it('Ok, refreshing acess token.', (done) => {

    // slee; 1.5 sec so time will pass, otherwise creating a new acess token will result in the same token
    sleep(1500).then(() => {
      request(app)
      .get('/managers/me/access-token')
      .set({'x-refresh-token': userRefreshToken, '_id':user__ID})
      .send({})
      .then((res) => {
        const body = res.body;
        const header = res.headers;

        expect(res.status).to.equals(200);
        expect(header).to.contain.property('x-access-token');
        old = useraccessToken
        useraccessToken =  header['x-access-token'];

        expect(useraccessToken).to.not.equals(old); //shuld not be the same token

        //try to use new acess token
        request(app)
        .get('/records')
        .set('x-access-token',useraccessToken)
        .send({})
        .then((res) => {
          expect(res.status).to.equals(200); //authentication was sucessfull
          done();
        }).catch((err) => done(err));
      }).catch((err) => done(err))
    });
  });







  // 2.2 - admin
  // 3.2 - manager
  it('Fail, manager\\Admin changing password with wrong acess token', (done) => {
    let newPass = 'manager-new-pass1234';

    request(app)
    .patch('/managers/changePassword')
    .set('x-access-token','bad-token')
    .send({'oldPassword':userPass, 'newPassword':newPass})
    .then((res) => {
      expect(res.status).to.equals(401);
      done();
    }).catch((err) => done(err))
  });




  // 2.2 - admin
  // 3.2 - manager
  it('Fail, manager\\Admin changing password with bad password', (done) => {
    let newPass = 'manager-new-pass1234';

    request(app)
    .patch('/managers/changePassword')
    .set('x-access-token',useraccessToken)
    .send({'oldPassword':'bady-passwordy-0r45ujitu453hg', 'newPassword':newPass})
    .then((res) => {
      expect(res.status).to.not.equals(200);
      done();
    }).catch((err) => done(err))
  });





  // 2.2 - admin
  // 3.2 - manager
  it('Ok, manager\\Admin changing password', (done) => {
    let newPass = 'manager-new-pass1234';

    request(app)
    .patch('/managers/changePassword')
    .set('x-access-token',useraccessToken)
    .send({'oldPassword':userPass, 'newPassword':newPass})
    .then((res) => {
      const body = res.body;
      const header = res.headers;

      expect(res.status).to.equals(200);
      userPass = newPass

      //try to login with new password
      request(app).post('/managers/login').send({
        userID: username,
        password: userPass,
      }).then((res) => {
        const body = res.body;
        const header = res.headers;

        expect(res.status).to.equals(200);

        useraccessToken =  header['x-access-token'];

        expect(header).to.contain.property('x-refresh-token');
        expect(header).to.contain.property('x-access-token');
        done();

      }).catch((err) => done(err))
    }).catch((err) => done(err))
  });


});

