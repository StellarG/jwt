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

            if(token){
                await model.user.update({last_login : Date.now()},{where :{username : username}})
                res.status(200).json({
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

controller.verifyOtp = async (req, res) =>{
    try {
        let {username,otp} = req.body

        if(!username || !otp){
            res.status(400).json({
                code : "02",
                status : false,
                message : "Username dan OTP kosong tidak diperbolehkan!"
            })
        }else{
            let isExist = await model.otp.findOne({
                where :{
                    username : username
                },
                order :[
                    ['create_dt','DESC']
                ]   
            })

            if(!isExist){
                res.status(400).json({
                    code : "02",
                    status : false,
                    message : "Username tidak ditemukan, silahkan registrasi terlebih dahulu"
                })
            }else{
                let otpCompare = await bcrypt.compare(otp, isExist.dataValues.otp)

                if(!otpCompare){
                    res.status(400).json({
                        code : "02",
                        status : false,
                        message : "otp yang anda masukkan tidak sesuai!"
                    })
                }else{
                    if(isExist['dataValues']['expired_dt'] < Date.now()){
                        let deleteOtp = await model.otp.destroy({
                            where : isExist['dataValues']['id']
                        })
                        res.status(400).json({
                            code : "02",
                            status : false,
                            message : "otp yang anda masukkan sudah expired!"
                        })
                    }else{
                        let updateVerif = await model.user.update({isverified :true},{
                            where : {
                                username : username
                            }
                        })
                        
                        if(updateVerif){
                            await model.otp.destroy({
                                where : {
                                    id : isExist.dataValues.id
                                }
                                
                            })
                            res.status(200).json({
                                code : "01",
                                status : true,
                                message : "anda sudah ter-verifikasi"
                            })
                        } else {
                            res.status(400).json({
                                code : "02",
                                status : false,
                                message : "terjadi kesalahan verfikasi, coba lagi nanti"
                            })
                        }
                    }
                }
            }
        }
        
    } catch (error) {
        res.status(400).json({
            code : "02",
            status : false,
            message : error.message
        })
    }
}

module.exports = controller