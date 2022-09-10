const Sequelize = require('sequelize');
const db = require('../../database/db')
const model = {}

model.account = db.define('account',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull : false
    },
    name : Sequelize.STRING,
    amount : Sequelize.INTEGER,
    create_dt : Sequelize.DATE
},
{
    schema : 'test',
    tableName: 'account',
    timestamps: false,
    freezeTableName: true
}
)


module.exports = model