'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

const chance = require('chance')();

describe('test/app/controller/user.test.js', () => {
  describe('POST /user/register', () => {
    it('should register successfully', async () => {
      const salt = uuidv1();
      const username = 'test' + Math.round(Math.random() * 10000);

      const res = await app
        .httpRequest()
        .post('/user/register')
        .send({
          username,
          type: 1,
          password: '123456',
          phone: chance.phone()
        })
        .expect(200);

      assert(res.body.success);

      describe('POST /user/check', () => {
        it('should check token successfully', async () => {
          const _res = await app
            .httpRequest()
            .post('/user/check')
            .set('X-Token', res.body.payload.token)
            .expect(200);

          assert(_res.body.success);
        });
      });

      describe('POST /user/login', () => {
        it('should login successfully', async () => {
          const _res = await app
            .httpRequest()
            .post('/user/login')
            .send({
              upe: 'admin',
              password: '123456'
            })
            .expect(200);

          assert(_res.body.success);

          describe('POST /user/lock/:id', () => {
            it('should lock user successfully', async () => {
              const __res = await app
                .httpRequest()
                .post(`/user/lock/${res.body.payload.id}`)
                .set('X-Token', _res.body.payload.token)
                .expect(200);

              assert(__res.body.success);
            });
          });

          describe('POST /user/login', () => {
            it('should login failed because of lock status', async () => {
              const __res = await app
                .httpRequest()
                .post('/user/login')
                .send({
                  upe: username,
                  password: '123456'
                })
                .expect(200);

              assert(!__res.body.success);
            });
          });

          describe('POST /user/unlock/:id', () => {
            it('should unlock user successfully', async () => {
              const __res = await app
                .httpRequest()
                .post(`/user/unlock/${res.body.payload.id}`)
                .set('X-Token', _res.body.payload.token)
                .expect(200);

              assert(__res.body.success);
            });
          });

          describe('POST /user/login', () => {
            it('should login successfully because of normal status', async () => {
              const __res = await app
                .httpRequest()
                .post('/user/login')
                .send({
                  upe: username,
                  password: '123456'
                })
                .expect(200);

              assert(__res.body.success);
            });
          });

          describe('POST /user/remove/:id', () => {
            it('should remove user successfully', async () => {
              const __res = await app
                .httpRequest()
                .post(`/user/remove/${res.body.payload.id}`)
                .set('X-Token', _res.body.payload.token)
                .expect(200);

              assert(__res.body.success);
            });
          });

          describe('POST /user/login', () => {
            it('should login failed because of remove status', async () => {
              const __res = await app
                .httpRequest()
                .post('/user/login')
                .send({
                  upe: username,
                  password: '123456'
                })
                .expect(200);

              assert(!__res.body.success);
            });
          });
        });
      });
    });
  });
});
