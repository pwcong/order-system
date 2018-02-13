'use strict';

const path = require('path');
const fs = require('fs-extra');
const hasha = require('hasha');
const moment = require('moment');
const sendToWormhole = require('stream-wormhole');

const Service = require('egg').Service;

class AttachmentService extends Service {
  async save(user_id, stream) {
    const { app, ctx } = this;

    const staticDir = app.config.static.dir;
    const staticPrefix = app.config.static.prefix;

    return new Promise(async (resolve, reject) => {
      try {
        const buffer = await this.ctx.helper.streamToBuffer(stream);
        const extname = path.extname(stream.filename);
        const bufferMD5 = await hasha(buffer, {
          algorithm: 'md5'
        });

        const _attachment = await app.model.Attachment.findById(bufferMD5);

        if (_attachment) {
          resolve({
            url:
              staticPrefix +
              'attachments/' +
              _attachment.year +
              '/' +
              _attachment.month +
              '/' +
              _attachment.date +
              '/' +
              bufferMD5 +
              _attachment.extname
          });
        }

        const now = new Date();
        const _urlPrefix = 'attachments' + moment(now).format('/YYYY/MM/DD');
        const _url = _urlPrefix + '/' + bufferMD5 + extname;
        const _dir = path.join(staticDir, _urlPrefix);

        if (!fs.pathExistsSync(_dir)) {
          fs.mkdirsSync(_dir);
        }

        const dst = path.join(staticDir, _url);
        fs.writeFileSync(dst, buffer);

        await app.model.Attachment.create({
          id: bufferMD5,
          user_id,
          year: moment(now).format('YYYY'),
          month: moment(now).format('MM'),
          date: moment(now).format('DD'),
          extname
        });

        resolve({
          url: staticPrefix + _url
        });
      } catch (err) {
        await sendToWormhole(stream);
        reject({
          message: err.message
        });
      }
    });
  }
}

module.exports = AttachmentService;
