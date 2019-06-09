import Sequelize from 'sequelize';

const db = new Sequelize('compratec', 'astaroth@cehss', 'pwdCEhss1*', {
  dialect: 'mysql',
  host: "cehss.mysql.database.azure.com",
  port: 3306,
});

db.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
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

export default db;
