const Sequelize = require('sequelize');
const db = require('../../database/db')
const model = {}

model.user = db.define('user',{
    user_id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull : false
    },
    username : Sequelize.STRING,
    password : Sequelize.STRING,
    create_date : Sequelize.DATE,
    last_login : Sequelize.DATE,
    isdeleted : Sequelize.BOOLEAN,
    role_id : Sequelize.INTEGER,
    isverified : Sequelize.BOOLEAN,
    email : Sequelize.STRING
},
{
    schema : 'test',
    tableName: 'user',
    timestamps: false,
    freezeTableName: true
}
)

module.exports = model