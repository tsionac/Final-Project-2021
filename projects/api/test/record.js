// testing was inspired bt this youtube tuturial :
// https://www.youtube.com/watch?v=7VNgjfmv_fE

process.env.NODE_ENV = 'test' // tel the enviroment to run in "test mode" (using a mock DB)

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app.js');
const conn = require('../db/index.js');



let userID = 'test-user-42';
let componentID = 'test-component-42';
let actionID = 1;
let editStart = new Date();
let editEnd = new Date();
editEnd.setSeconds(editEnd.getSeconds() + 10); // adding 10 second to simulate an edit


//4.1
describe('POST /records', () => {

    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err))
        console.log("before")
    });

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err))
        console.log("After")

    });

    //4.1
    it('OK, posting a new record to /records (edit start).', (done) => {
        request(app).post('/records').send({

            userID,
            componentID,
            actionID,
            editStart,
            //editEnd

        }).then((res) => {
            const body = res.body;

            expect(body).to.contain.property('userID').to.equals(userID);
            expect(body).to.contain.property('componentID').to.equals(componentID);
            expect(body).to.contain.property('editStart');

            expect(+new Date(body.editStart) === +new Date(editStart)).to.equals(true);

            done();
        }).catch((err) => done(err))
    });

    it('OK, posting a new record to /records (edit end).', (done) => {
        request(app).post('/records').send({

            userID,
            componentID,
            actionID,
            //editStart,
            editEnd

        }).then((res) => {
            const body = res.body;

            expect(body).to.contain.property('userID').to.equals(userID);
            expect(body).to.contain.property('componentID').to.equals(componentID);
            expect(body).to.contain.property('actionID').to.equals(actionID);
            expect(body).to.contain.property('editStart');
            expect(body).to.contain.property('editEnd');

            expect(+new Date(body.editStart) === +new Date(editStart)).to.equals(true);
            expect(+new Date(body.editEnd) === +new Date(editEnd)).to.equals(true);

            done();
        }).catch((err) => done(err))
    });

    //4.1
    it('Fail, posting a new record to /records with missing userID.', (done) => {
        request(app).post('/records').send({

            //userID,
            componentID,
            actionID,
            //editStart,
            editEnd

        }).then((res) => {
            expect(res.status).to.equals(400); // error - bad request

            done();
        }).catch((err) => done(err))
    });

    // 4.1
    it('Fail, posting a new record to /records with missing componentID.', (done) => {
        request(app).post('/records').send({

            userID,
            //componentID,
            actionID,
            //editStart,
            editEnd

        }).then((res) => {
            expect(res.status).to.equals(400); // error - bad request

            done();
        }).catch((err) => done(err))
    });

    // 4.1
    it('Fail, posting a new record to /records with no dates (not start AND no end).', (done) => {
        request(app).post('/records').send({

            userID,
            componentID,
            actionID,
            //editStart,
            //editEnd

        }).then((res) => {
            expect(res.status).to.equals(400); // error - bad request

            done();
        }).catch((err) => done(err))
    });

});