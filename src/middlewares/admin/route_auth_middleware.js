const ApiResponse = require('../../utils/api_response');
const jwt = require('jsonwebtoken');

exports.veriftyToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return ApiResponse.unauthorized(res);
    try{
        const decoded = jwt.verify(token,process.env.JWT_TOKEN);
        req.admin = decoded;
        next();
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}

generateToken = (id) =>{
   return jwt.sign({
        id:id
    },process.env.JWT_TOKEN,{expiresIn: process.env.EXPIRY_DURATION})
}

exports.requireRole = (roles) => (req, res, next)=>{
    if(!roles.includes(req.admin.role)){
        return ApiResponse.forbidden(res,"Insufficient role");
    }
    next();
}

exports.checkPermission = (permission)=>(req,res,next)=>{
    if(!req.admin.permissions.includes(permission)){
        return ApiResponse.forbidden(res,"Permission denied");
    }
    next();
}

module.exports = generateToken;