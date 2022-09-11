const model = require('../../config/model')
const { Op, Sequelize } = require('sequelize')
const db = require('../../config/database/db')
const controller = {}
const query = require('../../config/model/query')
const enc = require('../../config/security/encrypt')
const helper = require('../../middlewares/response')
const regExp = require('../../middlewares/regExp')

controller.postUser = async (req, res) => {
    try {
        let data = {
            username : req.body.username,
            password : req.body.password,
            last_login : Date.now(),
            role_id : 2,
            email : req.body.email
        }

        if(data['username'] == "" || data['password'] == "" || data['email'] == ""){res.status(400).json(helper.emptyMessage("Field tidak boleh kosong!"))}
        else if(!regExp.username(data['username'])){res.status(400).json(helper.emptyMessage("Penulisan Username Salah"))}
        else if(!regExp.email(data['email'])){res.status(400).json(helper.emptyMessage("Penulisan email Salah"))}
        else if(data['password'].length < 8){res.status(400).json(helper.emptyMessage("password harus lebih dari 8 huruf"))}
        else{
            let isExist = await model.user.findOne({
                where : {
                    [Op.and] : [
                        {username : data['username']},
                        {isdeleted : false}
                    ],
                    [Op.and] : [
                        {email : data['email']},
                        {isdeleted : false}
                    ]
                }
            })

        
            if(isExist){
                res.status(400).json(helper.NotFound('Username atau email telah digunakan'))
            }else{

                data['password'] = await enc.hashPassword(req.body.password)
                let create = await model.user.create(data)
    
                if(create){res.status(201).json(helper.successMessage(create))}
                else{res.status(400).json(helper.errorMessage('Registrasi gagal'))}
            }
        }

    } catch (error) {
        res.status(400).json(error['message'])
    }
}

controller.postAdmin = async (req, res) => {
    try {
        let data = {
            username : req.body.username,
            password : req.body.password,
            last_login : Date.now(),
            role_id : 2,
            email : req.body.email
        }

        if(data['username'] == "" || data['password'] == "" || data['email'] == ""){res.status(400).json(helper.emptyMessage("Field tidak boleh kosong!"))}
        else if(!regExp.username(data['username'])){res.status(400).json(helper.emptyMessage("Penulisan Username Salah"))}
        else if(!regExp.email(data['email'])){res.status(400).json(helper.emptyMessage("Penulisan email Salah"))}
        else if(data['password'].length < 8){res.status(400).json(helper.emptyMessage("password harus lebih dari 8 huruf"))}
        else{
            let isExist = await model.user.findOne({
                where : {
                    [Op.and] : [
                        {username : data['username']},
                        {isdeleted : false}
                    ],
                    [Op.and] : [
                        {email : data['email']},
                        {isdeleted : false}
                    ]
                }
            })

        
            if(isExist){
                res.status(400).json(helper.NotFound('Username atau email telah digunakan'))
            }else{

                data['password'] = await enc.hashPassword(req.body.password)
                let create = await model.user.create(data)
    
                if(create){res.status(201).json(helper.successMessage(create))}
                else{res.status(400).json(helper.errorMessage('Registrasi gagal'))}
            }
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