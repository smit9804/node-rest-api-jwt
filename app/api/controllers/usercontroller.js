const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports ={
    create: function(req, res, next){
        userModel.create({email: req.body.email, password: req.body.password}, (err, result) =>{
            if (err){
                next(err);
            }
            else{
                res.json({status: "success", message: "Successfully added the user.", data: null});
            }
        });
    },
    autheticate: function(req, res, next) {
        userModel.findOne({email: req.body.email}, (err, userInfo)=>{
            if (err){
                next(err);
            }
            else{
                if (bcrypt.compareSync(req.body.password, userInfo.password)){
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'),
                    { expiresIn: '1h'});
                    res.json({status: "Success", message: "Found that user", data:{user: userInfo, token: token}});
                }
                else{
                    res.json({status: "error", message: "Invalid email or password", data: null});
                }
            }
        });
    },
}