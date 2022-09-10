const {Op, Sequelize} = require('sequelize')
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
            nama : req.body.nama,
            amount : req.body.amount
        }
    
        let create = await db.query(query.createAccount(data))
        
    } catch (error) {
        res.status(400).json(error['message'])
    }
   

}

module.exports = controller