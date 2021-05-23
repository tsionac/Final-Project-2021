// testing was inspired bt this youtube tuturial :
// https://www.youtube.com/watch?v=7VNgjfmv_fE

process.env.NODE_ENV = 'test' // tel the enviroment to run in "test mode" (using a mock DB)

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app.js');
const conn = require('../db/index.js');


let userID = 'Admin';
let companyID = 'Admin';
let password = '12345678';


// 1.2
// 2.1
// 2.3
describe('admin login', () => {


  before((done) => {
    conn.connect()
    .then(() => done())
    .catch((err) => done(err))
  });

  after((done) => {
    conn.close()
    .then(() => done())
    .catch((err) => done(err))
  });


  //1.2 + 2.1
  it('OK, login to admim.', (done) => {

    request(app).post('/managers/login').send({

      userID,
      password,
    }).then((res) => {
      const body = res.body;
      const header = res.headers;

      expect(res.status).to.equals(200);
      expect(header).to.contain.property('x-refresh-token');
      expect(header).to.contain.property('x-access-token');

      done();
    }).catch((err) => done(err))
  });


  //2.1
  it('Fail, login to with bad admin password.', (done) => {
    request(app).post('/managers/login').send({

      userID,
      password:'hfreuighruiwgfi375u4nh67t r9843h nfvrkjeh g54879yg 53iuobgv',
    }).then((res) => {
      expect(res.status).to.equals(401);
      done();
    }).catch((err) => done(err))
  });


});




// 1. login as admin
// 2. create a new user
// 3. login as the new user
// 4. re-create that user (whith admin's access token) (should fail)
describe('admin create a new manager', () => {


  before((done) => {
    conn.connect()
    .then(() => done())
    .catch((err) => done(err))
  });

  after((done) => {
    conn.close()
    .then(() => done())
    .catch((err) => done(err))
  });


  // 2.3
  it('OK, add new user.', (done) => {

    //login to admin
    request(app).post('/managers/login').send({
      userID,
      password,
    }).then((res) => {
      const body = res.body;
      const header = res.headers;


      let AdminaccessToken =  header['x-access-token'];
      let refreshToken =  header['x-refresh-token'];

      let userComp = 'figureoutLater';
      let username = 'newUser123';
      let userPass = 'i-am-new-user';

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

        //try to login to the new user, to make sure it was added properly
        request(app).post('/managers/login').send({
          userID: username,
          password: userPass,
        }).then((res) => {
          const body = res.body;
          const header = res.headers;

          expect(res.status).to.equals(200);
          expect(header).to.contain.property('x-refresh-token');
          expect(header).to.contain.property('x-access-token');

          //re-add it - should fail
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

            expect(res.status).to.not.equals(200);

            done();

          }).catch((err) => done(err));

        }).catch((err) => done(err));

      }).catch((err) => done(err))

    }).catch((err) => done(err))
  });


});


