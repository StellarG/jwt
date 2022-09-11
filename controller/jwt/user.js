const model = require('../../config/model')
const { Op, Sequelize } = require('sequelize')
const db = require('../../config/database/db')
const controller = {}
const query = require('../../config/model/query')
const enc = require('../../config/security/encrypt')

controller.postUser = async (req, res) => {
    try {
        let hashPass = await enc.hashPassword(req.body.password)
        let data = {
            username : req.body.username,
            password : hashPass,
            last_login : Date.now(),
            role_id : 2
        }

        let isExist = await model.user.findOne({
            where : {
                [Op.and] : [
                    {username : data['username']},
                    {isdeleted : false}
                ]
            }
        })
    
        if(isExist){
            res.status(400).json('username sudah ada')
        }else{
            let create = await model.user.create(data)

            if(create){res.status(201).json("data berhasil dibuat")}
            else{res.status(400).json('gagal buat data')}
        }

    } catch (error) {
        res.status(400).json(error['message'])
    }
}

controller.postAdmin = async (req, res) => {
    try {
        let hashPass = await enc.hashPassword(req.body.password)
        let data = {
            username : req.body.username,
            password : hashPass,
            last_login : Date.now(),
            role_id : 1
        }

        let isExist = await model.user.findOne({
            where : {
                [Op.and] : [
                    {username : data['username']},
                    {isdeleted : false}
                ]
            }
        })
    
        if(isExist){
            res.status(400).json('username sudah ada')
        }else{
            let create = await model.user.create(data)

            if(create){res.status(201).json("data berhasil dibuat")}
            else{res.status(400).json('gagal buat data')}
        }

    } catch (error) {
        res.status(400).json(error['message'])
    }
}

controller.softDelete = async (req, res) => {
    try {

        let id = req.params.id
        let deletes

        let isExist = await model.user.findOne({
            where : {
                user_id : id
            }
        })
        if(isExist){
            if(isExist['isdeleted'] == false){
                let data = {
                    isdeleted : true
                }
                
                deletes = await model.user.update(data,{
                    where : {
                        user_id : id
                    }
                })
    
                if(deletes){res.status(200).json("data berhasil dihapus")}
            }
        }else{
            res.status(404).json("data tidak ada")
        }
        
    } catch (error) {
        res.status(400).json(error['message'])
    }
}

controller.delete = async (req, res) => {
    try {
        let deletes = await model.user.destroy({
            where : {
                isdeleted : true
            }
        })

        if(deletes){res.status(200).json("data berhasil dihapus")}
        else{res.status(404).json("Tidak ada data yang dihapus")}
        
    } catch (error) {
        res.status(400).json(error['message'])
    }
}


module.exports = controller