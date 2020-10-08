const jwt = require ('jsonwebtoken');
const User = require('../models/user.model.js')
const Role = require('../models/role.model');
const cookies = require('cookies');


const verifyToken = async (req, res, next) => {
    
    let authentification = new cookies(req, res, { keys: process.env.JWT_KEY });
    req.jwt = await authentification.get('JWT')
    if (req.jwt === undefined) {
        return res.send({message: 'Please Log in'})
    } 
    try {
        const decodedToken = await jwt.verify(req.jwt, process.env.JWT_KEY);
        req.userId =  decodedToken.id;
        req.jwt = jwt.verify(req.jwt, process.env.JWT_KEY, function(err, decoded) {
        return next();
        });
    }   
    catch(e) {
            authentification.set('JWT', null)
            return res.send({message: 'Unauthorized' + ':' + e})
    }
}

isAdmin = async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.userId)
        const foundRole = await Role.find({_id: { $in : foundUser.roles}})
        for (let i =0; i<foundRole.length; i++) {
            if (foundRole[i].name === "admin") { return next();}
            return res.status(403).json({ message: 'Require Admin Role'});
        }
    } catch (error) {
        return res.status(401).json ({ message: error});
    }
}



const authJwt = {
    verifyToken,
    isAdmin
};
module.exports = authJwt;