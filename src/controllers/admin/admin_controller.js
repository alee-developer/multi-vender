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

exports.getProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await Admin.findById(id);
        if (!admin) return ApiResponse.notFound(res, "Invalid credentials");
        ApiResponse.success(res, "Profile fetched successufully", admin);
    }
    catch (error) {
        return ApiResponse.error(res);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const id = req.params.id
        const { name, phone, permissions, profilePicture } = req.body;
        const admin = await Admin.findById(id);
        if (!admin) return ApiResponse.notFound(res, "Admin does not exist")
        admin.name = name;
        admin.phone = phone;
        admin.permissions = permissions || [],
            admin.profilePicture = profilePicture;
        await admin.save();
        ApiResponse.success(res, "Profile updated successfully", admin);
    }
    catch (error) {
        return ApiResponse.error(res)
    }
}

exports.updateStatus = async (req, res) => {
    const statuses = ["active", "deactive"];
    try {
        const id = req.params.id;
        const status = req.params.status;
        const admin = await Admin.findById(id);
        if (!admin) return ApiResponse.notFound(res, "Invalid credentials");
        if (!statuses.includes(status)) return ApiResponse.notFound(res, "Invalid status {active/deactive}");
        admin.isActive = status === "active" ? true : false;
        await admin.save();
        ApiResponse.success(res, "Status updated successfully.",admin)
    } catch (error) {
        return ApiResponse.error(res)
    }
}


exports.changeRole = async (req, res) => {
    const roles = ['super-admin', 'manager', 'staff'];
    try {
        const id = req.params.id;
        const { newRole } = req.body;
        const admin = await Admin.findById(id);
        if (!admin) return ApiResponse.notFound(res, "Invalid credentials")
        if (!roles.includes(newRole)) return ApiResponse.notFound(res, "Insufficient role")
        admin.role = newRole;
        await admin.save();
        ApiResponse.success(res, 'Role checned successfully', admin);
    }
    catch (e) {
        return ApiResponse.error(res)
    }
}