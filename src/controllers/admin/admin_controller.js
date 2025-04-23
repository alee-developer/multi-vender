const Admin = require('../../models/admin/admin_model');
const ApiResponse = require('../../utils/api_response');
const {passwordEncoder, passwordDecoder} = require('../../utils/password_crypter');
const generateToken = require('../../middlewares/admin/route_auth_middleware')

exports.loginAdmin = async(req, res)=>{
    try{
        console.log(req.body);
        const {email, password} = req.body;
    const admin = await Admin.findOne({email});
    if(!admin) return ApiResponse.notFound(res,"Invalid credentials",);
    const isMatch = await passwordDecoder(password,admin.password);
    if(!isMatch) return ApiResponse.notFound(res,"Invalid credentials");
    admin.lastLogin = new Date();
    await admin.save();
    const token = generateToken(admin._id);
    ApiResponse.success(res,"login successful",{
        token:token,
        admin
    })
    }
    catch(error){
        return ApiResponse.error(res);
    }
}

exports.signupAdmin = async (req,res)=>{
    try{
        console.log(req.body);
     const { name, email, password, phone, role, permissions,profilePicture } = req.body;
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin) return ApiResponse.fail(res,"User already exist!");
        const passwordHash = await passwordEncoder(password,10);
        const admin = new Admin({
           name:name,email,password:passwordHash,role,permissions:permissions||[],phone,profilePicture
        });
   
        await admin.save();
        const token = generateToken(admin._id);
        ApiResponse.success(res,"Admin signup successful",{
           token,admin
        });
    }
    catch(error){
        return ApiResponse.error(res, error.message);
    }
}