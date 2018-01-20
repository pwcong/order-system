'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

const chance = require('chance')();

describe('test/app/controller/user_info.test.js', () => {
  describe('POST /user/register', () => {
    it('should login successfully', async () => {
      const res = await app
        .httpRequest()
        .post('/user/login')
        .send({
          upe: 'admin',
          password: '123456'
        })
        .expect(200);

      assert(res.body.success);

      describe('GET /user/info', () => {
        it('should get user info failed without header of X-Token', async () => {
          const _res = await app
            .httpRequest()
            .get('/user/info')
            .expect(200);

          assert(!_res.body.success);
        });
        it('should get user info successfully', async () => {
          const _res = await app
            .httpRequest()
            .get('/user/info')
            .set('X-Token', res.body.payload.token)
            .expect(200);

          assert(_res.body.success);
        });
      });

      describe('GET /user/info/:id', () => {
        it('should get user info failed without header of X-Token', async () => {
          const _res = await app
            .httpRequest()
            .get('/user/info/10001')
            .expect(200);

          assert(!_res.body.success);
        });
        it('should get user info successfully', async () => {
          const _res = await app
            .httpRequest()
            .get('/user/info/10001')
            .set('X-Token', res.body.payload.token)
            .expect(200);

          assert(_res.body.success);
        });
      });

      describe('POST /user/info', () => {
        it('should modify user info failed without header of X-Token', async () => {
          const _res = await app
            .httpRequest()
            .post('/user/info')
            .expect(200);

          assert(!_res.body.success);
        });
        it('should modify user info failed without request body', async () => {
          const _res = await app
            .httpRequest()
            .post('/user/info')
            .set('X-Token', res.body.payload.token)
            .expect(200);

          assert(_res.body.success);
        });
        it('should modify user info successfully', async () => {
          const newAddress = chance.address();

          const _res = await app
            .httpRequest()
            .post('/user/info')
            .set('X-Token', res.body.payload.token)
            .send({
              address: newAddress
            })
            .expect(200);

          assert(_res.body.success);
          assert(_res.body.payload.address === newAddress);
        });
      });
    });
  });
});
