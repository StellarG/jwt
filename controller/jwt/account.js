const model = require('../../config/model')
const { Op, Sequelize } = require('sequelize')
const db = require('../../config/database/db')
const controller = {}
const query = require('../../config/model/query')

controller.get = async (req, res) => {
    try {
        let [rs] = await db.query(query.getAllAccount())

        if(rs.length > 0){res.status(200).json(rs)}
        else{res.status(200).json("not found")}
    } catch (error) {
        res.status(400).json(error['message'])
    }
}

controller.post = async (req, res) => {
    try {

        let data = {
            name : req.body.name,
            amount : req.body.amount
        }

        await db.query(query.createAccount(data)).then(rs => {
            res.status(201).json(data)
        })

    } catch (error) {
        res.status(400).json(error['message'])
    }  

}

controller.getById = async (req, res) =>  {
    let id = req.params.id
    let result = []

    await model.account.findOne({
        where :{
            id : id
        }
    }).then(rs =>{
        if(rs != null){
            result.push(rs.dataValues)
            res.status(200).json(result)
        }
        else{res.status(200).json('Data Ga ono yo su!')}
        
    }).catch(err =>{
        res.status(400).json(err['message'])
    })
}

controller.update = async (req, res) => {
    let id = req.params.id

    let data = {
        name : req.body.name,
        amount : req.body.amount
    }

    await model.account.update(data,{
        where : {
            id : id
        }
    }).then(rs =>{
        res.status(200).json("Data Sukses Di Update")
    }).catch(err =>{
        res.status(400).json(err['message'])
    })
}

controller.delete = async (req, res) => {
    let id = req.params.id

    let data = await model.account.findOne({
        where : {
            id : id
        }
    })

    if(data != null){
        await model.account.destroy({
            where : {
                id : id
            }
        }).then(rs =>{
            res.status(200).json("Data Berhasil Dihapus")
        })
    }else{
        res.status(404).json("Data Tidak Ditemukan")
    }
}

module.exports = controller