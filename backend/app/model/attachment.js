'use strict';

module.exports = app => {
  const { STRING, INTEGER, DECIMAL } = app.Sequelize;

  const Attachment = app.model.define('attachment', {
    id: {
      type: STRING,
      primaryKey: true
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.User,
        key: 'id'
      }
    },
    year: {
      type: STRING,
      allowNull: false
    },
    month: {
      type: STRING,
      allowNull: false
    },
    date: {
      type: STRING,
      allowNull: false
    },
    extname: {
      type: STRING
    }
  });

  return Attachment;
};
