const model = require('../../config/model')
const bcrypt = require('bcryptjs')
const { Op, Sequelize } = require('sequelize')
// const jwt = require('jsonwebtoken')
const db = require('../../config/database/db')
const controller = {}
const query = require('../../config/model/query')
const enc = require('../../config/security/encrypt')
const jwt = require('../../config/security/jwt')
const Regex = require('../../middlewares/regExp')
const ress = require('../../middlewares/response')
const otp = require('../../middlewares/otpGenerator')
const Mailer = require('../../middlewares/nodeMailer')

controller.login = async (req, res) => {
    try {

        const username = req.body.username
        const password = req.body.password

        let check = await model.user.findOne({
            where : {
                username : username
            }
        })

        let verified = check == null ? false : check.dataValues.isverified

        if(!check){
            res.status(404).json({
                code : "02",
                status : false,
                message : 'Username tidak terdaftar!'
            })
        } else{

            if(verified == false){
                res.status(403).json({
                    code : "02",
                    status : false,
                    message : "Akun anda belum di-verifikasi, silahkan lakukan verifikasi terlebih dahulu!"
                })
            }else{
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
            }
        }
        
    } catch (error) {
        res.status(400).json({
            code : "02",
            status : false,
            message : error['message']
        })
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

controller.requestOTP = async (req, res) => {
    try {
        const email = req.body.email
    
        if(!Regex.email(email)){
            res.status(400).json(ress.errorMessage('Penulisan Email Salah!'))
        }else{
            let isExist = await model.user.findOne({
                where : {
                    email : email
                }
            })
            console.log('masuk kadie');
            let verified = isExist == null ? false : isExist.dataValues.isverified
            console.log('masuk kadei 2');
            if(verified){
                res.status(400).json(ress.errorMessage('email anda sudah ter-verifikasi!'))
            }else{
                if(!isExist){
                    res.status(400).json(ress.errorMessage('email belum di-daftarkan, silahkan registrasi terlebih dahulu'))
                }else{
                    const generateOtp = await otp.generateOtp()
                    const hashedOtp = await enc.hashOtp(generateOtp)
    
                    let newOTP = await model.otp.create({
                        username : isExist['dataValues']['username'],
                        otp : hashedOtp,
                        create_dt : Date.now(),
                        expired_dt : Date.now() + 3600000
                    })
    
                    if(newOTP){console.log('create Otp berhasil')}
                    else{console.log('create otp gagal');}
    
                    let sendMail = await Mailer.sendEmail(email, generateOtp)
                    if (sendMail) {
                        res.status(200).json({
                            code : "01",
                            status : "PENDING",
                            message : "Verfication OTP email Sent",
                            data : {
                                username : isExist['username'],
                                email : isExist['email']
                            }
                        })
                    } else {
                        res.status(400).json({
                            code : "02",
                            status : false,
                            message : "Failed to Send Email"
                        })
                    }
                }
            } 
        }

    } catch (error) {
        res.status(400).json(ress.errorMessage(error.message))
    }

}
module.exports = controller