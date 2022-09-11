const model = require('../../config/model')
const bcrypt = require('bcryptjs')
const { Op, Sequelize } = require('sequelize')
// const jwt = require('jsonwebtoken')
const db = require('../../config/database/db')
const controller = {}
const query = require('../../config/model/query')
const enc = require('../../config/security/encrypt')
const jwt = require('../../config/security/jwt')

controller.login = async (req, res) => {
    try {

        const username = req.body.username
        const password = req.body.password

        let check = await model.user.findOne({
            where : {
                username : username
            }
        })

        if(!check){res.status(404).json("Username Belum Terdaftar")}
        
        let passCheck = await bcrypt.compare(password, check['dataValues']['password'])

        if(passCheck){
            const data = {
                username : username,
                role_id : check['dataValues']['role_id']
            }

            let token = await jwt.generate(data)
            // console.log('token',token['message']);

            if(token){res.status(200).json({
                message : "Login Sukses",
                token : token
            })}
            else{res.status(400).json("generate token failed")}
              
        }else{
            res.status(401).json("Login Failed")
        }
        
    } catch (error) {
        res.status(400).json(error['message'])
    }
}

module.exports = controller