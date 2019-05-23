const { expect } = require('chai');
const request = require('supertest');
const host = require('../../bin/www');
//const { getRecord, getAllRecords } = require('../controllers/phonebook');

const fakeData = require('./helpers');

let token = null;

// describe('ok test', () => {
//   it('should', (done) => {
//     getAllRecords.
//   });
// })

describe('Phonebook Operations', () => {
  beforeEach('This gets the auth token and runs before the test below', (done) => {
    const loginData = {
      username: 'ok',
      password: 'password'
    };
    request(host)
      .post('/api/v1/loginUser')
      .send(loginData)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        expect(res.body.token).to.be.not.empty;
        expect(res.body.status).to.eq('success');
        expect(res.body).to.be.an('object');
        return done();
      });
  });

  it('Should create a new phonebook record', (done) => {
    request(host)
      .post('/api/v1/createRecord')
      .set('Authorization', `Bearer ${token}`)
      .send(fakeData)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.all.keys(['code', 'status', 'message']);
        expect(res.body.code).to.be.eq(200);
        expect(res.body.status).to.be.eq('success');
        expect(res.body.message).to.be.eq('Operation Successful');
        return done();
      });
  });

  it('Should get a single phonebook record', (done) => {
    request(host)
      .get('/api/v1/getRecord/6')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.all.keys(['code', 'status', 'data']);
        expect(res.body.code).to.be.eq(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.status).to.be.eq('success');
        expect(res.body.data).to.have.all.keys([
          'id',
          'firstname',
          'lastname',
          'email',
          'phone',
          'mobile',
          'company',
          'title',
          'created_date',
          'updated_date'
        ]);
        return done();
      });
  });

  it('Should get an error for a phonebook record that does not exist', (done) => {
    request(host)
      .get('/api/v1/getRecord/10000')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.all.keys(['code', 'status', 'message']);
        expect(res.body.code).to.be.eq(404);
        expect(res.body.status).to.be.eq('fail');
        expect(res.body.message).to.be.eq('ID is not found');
        return done();
      });
  });

  it('Should get all phonebook records', (done) => {
    request(host)
      .get('/api/v1/getAllRecords')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.all.keys(['code', 'status', 'data']);
        expect(res.body.code).to.be.eq(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.all.keys([
          'id',
          'firstname',
          'lastname',
          'email',
          'phone',
          'mobile',
          'company',
          'title'
        ]);
        return done();
      });
  });

  it('Should get all phonebook records and limit by 3', (done) => {
    request(host)
      .get('/api/v1/getAllRecords?page=2&limit=3')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.all.keys(['code', 'status', 'data']);
        expect(res.body.code).to.be.eq(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.all.keys([
          'id',
          'firstname',
          'lastname',
          'email',
          'phone',
          'mobile',
          'company',
          'title'
        ]);
        expect(res.body.data).to.have.lengthOf('3');
        return done();
      });
  });

  it('Should get all phonebook records that has firstname like "fir" ', (done) => {
    request(host)
      .get('/api/v1/getAllRecords?firstname=fir')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.all.keys(['code', 'status', 'data']);
        expect(res.body.code).to.be.eq(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.all.keys([
          'id',
          'firstname',
          'lastname',
          'email',
          'phone',
          'mobile',
          'company',
          'title'
        ]);
        return done();
      });
  });

  it('Should update a phonebook record', (done) => {
    request(host)
      .put('/api/v1/updateRecord/6')
      .send(fakeData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.all.keys(['code', 'status']);
        expect(res.body.code).to.be.eq(200);
        return done();
      });
  });
});
