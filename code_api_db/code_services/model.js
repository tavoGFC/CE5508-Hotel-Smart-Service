const Sequelize = require('sequelize');

const db = new Sequelize('hotelsmartservice', 'astaroth@cehss', 'pwdCEhss1*', {
  dialect: 'mysql',
  host: "cehss.mysql.database.azure.com",
  port: 3306,
});

db.define('user', {
  idUser: { type: Sequelize.INTEGER, primaryKey: true },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  userName: Sequelize.STRING,
},
  {
    timestamps: false,
    freezeTableName: false,
    tableName: 'user'
  }
);

db.define('comment', {
  idComment: { type: Sequelize.INTEGER, primaryKey: true },
  idUser: Sequelize.INTEGER,
  comment: Sequelize.STRING,
  urlPhoto: Sequelize.STRING,
  emotion: Sequelize.STRING,
},
  {
    timestamps: false,
    freezeTableName: false,
    tableName: 'comment'
  }
);


//export default db;
module.exports = db;
