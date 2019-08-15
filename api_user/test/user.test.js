require("babel-polyfill");
import supertest from 'supertest';
import server from '../src/config/server';

let token = 'a';
let id = Math.floor((Math.random() + 1) * (10 ** 5));
let cpf = Math.floor((Math.random() + 1) * (10 ** 10));
let email = 'a' + id.toString() + '@teste.com'

describe('Testing the User endpoint', () => {
  describe('User | REGISTER - POST', () => {
    let body = {
      "userId": id,
      "customerId": 1,
      "departmentId": 1,
      "cargoId": 1,
      "profileId": 1,
      "userStatusId": 1,
      "avatar": null,
      "userMainEmail": email,
      "userName": "Bruno Costa",
      "userGender": "M",
      "userBirthDate": new Date("1996-2-2"),
      "userCPF": cpf,
      "addresses": [
        {
          "addressTypeId": 1
        }
      ],
    };
    it('STATUS 201 CREATED', done => {
      supertest(server)
        .post('/api/user')
        .set('Authentication', `${token}`)
        .send(body)
        .expect(201)
        .end((err, res) => {
          console.log(res.text)
          done(err)
        });
    });
    it('STATUS 400 BAD REQUEST', done => {
      supertest(server)
        .post('/api/user')
        .set('Authentication', `${token}`)
        .send()
        .expect(400)
        .end((err, res) => done(err));
    });
    it('STATUS 401 UNAUTHORIZED', done => {
      supertest(server)
        .post('/api/user')
        .send(body)
        .expect(401)
        .end((err, res) => done(err));
    });
    it('STATUS 404 ROUTE NOT FOUND', done => {
      supertest(server)
        .post('/api/users')
        .set('Authentication', `${token}`)
        .send(body)
        .expect(404)
        .end((err, res) => done(err));
    });
  });
  describe('User | FIND ALL - GET', () => {
    it('STATUS 200 OK', done => {
      supertest(server)
        .get('/api/user')
        .set('Authentication', `${token}`)
        .expect(200)
        .end((err, res) => done(err));
    });
    it('STATUS 401 UNAUTHORIZED', done => {
      supertest(server)
        .get('/api/user')
        .expect(401)
        .end((err, res) => done(err));
    });
    it('STATUS 404 ROUTE NOT FOUND', done => {
      supertest(server)
        .get('/api/users')
        .set('Authentication', `${token}`)
        .expect(404)
        .end((err, res) => done(err));
    });
  });
  describe('User | FIND BY MAIL - GET', () => {
    it('STATUS 200 OK', done => {
      supertest(server)
        .get(`/api/user/${email}`)
        .set('Authentication', `${token}`)
        .expect(200)
        .end((err, res) => done(err));
    });
    it('STATUS 400 BAD REQUEST', done => {
      supertest(server)
        .get('/api/user/teste')
        .set('Authentication', `${token}`)
        .expect(400)
        .end((err, res) => done(err));
    });
    it('STATUS 404 USER NOT FOUND', done => {
      supertest(server)
        .get(`/api/user/das1132@unitario.com`)
        .set('Authentication', `${token}`)
        .expect(404)
        .end((err, res) => done(err));
    });
    it('STATUS 401 UNAUTHORIZED', done => {
      supertest(server)
        .get(`/api/user/${email}`)
        .expect(401)
        .end((err, res) => done(err));
    });
    it('STATUS 404 ROUTE NOT FOUND', done => {
      supertest(server)
        .get(`/api/users/${email}`)
        .set('Authentication', `${token}`)
        .expect(404)
        .end((err, res) => done(err));
    });
  });
  describe('User | UPDATE - PUT', () => {
    let body = {
      "avatar": null,
      "name": "Bruno Eduardo Costa",
      "gender": "M",
      "birthdate": "1996-2-2",
      "addresses": [
        {
          "userAddressId": id,
          "addressTypeId": 1
        },
        {
          "userAddressId": id + 1,
          "addressTypeId": 1
        },
        {
          "addressTypeId": 1
        }
      ]
    };
    it('STATUS 200 OK', done => {
      supertest(server)
        .put(`/api/user/${email}`)
        .set('Authentication', `${token}`)
        .send(body)
        .expect(200)
        .end((err, res) => {
          done(err)
        });
    });
    it('STATUS 404 USER NOT FOUND', done => {
      supertest(server)
        .put('/api/user/testess@unitario.com')
        .set('Authentication', `${token}`)
        .send(body)
        .expect(404)
        .end((err, res) => done(err));
    });
    it('STATUS 401 UNAUTHORIZED', done => {
      supertest(server)
        .put(`/api/user/${email}`)
        .send(body)
        .expect(401)
        .end((err, res) => done(err));
    });
    it('STATUS 404 ROUTE NOT FOUND', done => {
      supertest(server)
        .put(`/api/users/${email}`)
        .set('Authentication', `${token}`)
        .send(body)
        .expect(404)
        .end((err, res) => done(err));
    });
    it('STATUS 400 BAD REQUEST', done => {
      supertest(server)
        .put(`/api/user/${email}`)
        .set('Authentication', `${token}`)
        .send({
          "avatar": null,
          "name": "Bruno Eduardo Costa",
          "gender": "dadsasdasa",
          "birthdate": new Date("1996-2-2")
        })
        .expect(400)
        .end((err, res) => done(err));
    });
  });
  describe('User | REMOVE - DELETE', () => {
    it('STATUS 200 OK', done => {
      supertest(server)
        .delete(`/api/user/${email}`)
        .set('Authentication', `${token}`)
        .expect(200)
        .end((err, res) => done(err));
    });
    it('STATUS 400 BAD REQUEST', done => {
      supertest(server)
        .delete('/api/user/teste')
        .set('Authentication', `${token}`)
        .expect(400)
        .end((err, res) => done(err));
    });
    it('STATUS 401 UNAUTHORIZED', done => {
      supertest(server)
        .delete(`/api/user/${email}`)
        .expect(401)
        .end((err, res) => done(err));
    });
    it('STATUS 404 ROUTE NOT FOUND', done => {
      supertest(server)
        .delete(`/api/users/${email}`)
        .set('Authentication', `${token}`)
        .expect(404)
        .end((err, res) => done(err));
    });
  });
  describe('User | RECOVER PASSWORD - GET', () => {
    it('STATUS 200 OK', done => {
      supertest(server)
        .get(`/api/public/user/${email}/recover`)
        .expect(200)
        .end((err, res) => done(err));
    });
    it('STATUS 400 BAD REQUEST', done => {
      supertest(server)
        .get('/api/public/user/teste@unitario.cosm/recover')
        .expect(400)
        .end((err, res) => done(err));
    });
    it('STATUS 403 FORBIDDEN', done => {
      supertest(server)
        .get('/api/public/user/aaa@unitario.com/recover')
        .expect(403)
        .end((err, res) => done(err));
    });
    it('STATUS 404 ROUTE NOT FOUND', done => {
      supertest(server)
        .get('/api/public/user/teste@unitario.com/recove')
        .expect(404)
        .end((err, res) => done(err));
    });
  });
  describe('User | CHANGE PASSWORD - PUT', () => {
    it('STATUS 200 OK', done => {
      supertest(server)
        .put(`/api/user/${email}/password`)
        .set('Authentication', `${token}`)
        .send({
          "oldPassword": "††††††††",
          "newPassword": "teste123"
        })
        .expect(200)
        .end((err, res) => done(err));
    });
    it('STATUS 400 BAD REQUEST', done => {
      supertest(server)
        .put(`/api/user/${email}/password`)
        .set('Authentication', `${token}`)
        .expect(400)
        .end((err, res) => done(err));
    });
    it('STATUS 403 FORBIDDEN', done => {
      supertest(server)
        .put(`/api/user/${email}/password`)
        .set('Authentication', `${token}`)
        .send({
          "oldPassword": "12345678",
          "newPassword": "teste123"
        })
        .expect(403)
        .end((err, res) => done(err));
    });
    it('STATUS 404 ROUTE NOT FOUND', done => {
      supertest(server)
        .put('/api/user/aaa@unitario.com/passwords')
        .set('Authentication', `${token}`)
        .expect(404)
        .end((err, res) => done(err));
    });
  });
});
