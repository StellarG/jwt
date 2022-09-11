const Sequelize = require('sequelize');
const db = require('../../database/db')
const model = {}

model.otp = db.define('otp',{
    user_id : Sequelize.INTEGER,
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