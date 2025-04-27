const Admin = require('../../models/admin/admin_model');
const ApiResponse = require('../../utils/api_response');
const { passwordEncoder, passwordDecoder } = require('../../utils/password_crypter');
const generateToken = require('../../middlewares/admin/route_auth_middleware')

exports.loginAdmin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return ApiResponse.notFound(res, "Invalid credentials",);
        const isMatch = await passwordDecoder(password, admin.password);
        if (!isMatch) return ApiResponse.notFound(res, "Invalid credentials");
        admin.lastLogin = new Date();
        await admin.save();
        const token = generateToken(admin._id);
        ApiResponse.success(res, "login successful", {
            token: token,
            admin
        })
    }
    catch (error) {
        return ApiResponse.error(res);
    }
}

exports.signupAdmin = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, phone, role, permissions, profilePicture } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return ApiResponse.fail(res, "User already exist!");
        const passwordHash = await passwordEncoder(password, 10);
        const admin = new Admin({
            name: name, email, password: passwordHash, role, permissions: permissions || [], phone, profilePicture
        });

        await admin.save();
        const token = generateToken(admin._id);
        ApiResponse.success(res, "Admin signup successful", {
            token, admin
        });
    }
    catch (error) {
        return ApiResponse.error(res, error.message);
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return ApiResponse.notFound(res, "Invalid credentials");
        const passwordHash = await passwordEncoder(newPassword, 10);
        admin.password = passwordHash;
        await admin.save();
        ApiResponse.success(res, "Password forget successfully.");
    }
    catch (error) {
        return ApiResponse.error(res, error.message);
    }
}

const roles = ['super-admin', 'manager', 'staff'];
exports.changeRole = async (req, res) => {
   
    try {
        const { email, newRole } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return ApiResponse.notFound(res, "Invalid credentials")
        if (!roles.includes(newRole)) return ApiResponse.notFound(res, "Insufficient role")
        admin.role = newRole;
        await admin.save();
        ApiResponse.success(res,'Role checned successfully',admin);
    }
    catch (e) {
        return ApiResponse.error(res)
    }
}