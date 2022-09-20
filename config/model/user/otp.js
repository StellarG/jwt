const Sequelize = require('sequelize');
const db = require('../../database/db')
const model = {}

model.otp = db.define('otp',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    username : Sequelize.STRING,
    otp : Sequelize.STRING,
    create_dt : Sequelize.DATE,
    expired_dt : Sequelize.DATE
},{
    schema : 'test',
    tableName: 'otp',
    timestamps: false,
    freezeTableName: true
}
)

module.exports = model