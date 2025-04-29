const ApiResponse = require('../../utils/api_response');
const Coupon = require('../../models/coupon/coupon_model')

exports.add = async (req, res) => {
    try {
        const { code, discountType, discountValue, minOrderAmount, maxDiscount, isActive, validFrom, validTill, usageLimit, usedCount } = req.body;
        const coupon = new Coupon();
        coupon.code = code;
        coupon.discountType = discountType;
        coupon.discountValue = discountValue;
        coupon.minOrderAmount = minOrderAmount;
        coupon.maxDiscount = maxDiscount;
        coupon.isActive = isActive;
        coupon.validFrom = validFrom;
        coupon.validTill = validTill;
        coupon.usageLimit = usageLimit;
        coupon.usedCount = usedCount;
        await coupon.save();
        ApiResponse.success(res, "Coupon added successfully.", coupon);
    }
    catch (error) {
        return ApiResponse.error(res);
    }
}


exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const {code, discountType, discountValue, minOrderAmount, maxDiscount, isActive, validFrom, validTill, usageLimit, usedCount } = req.body;
        const coupon = await Coupon.findById(id);
        if(!coupon) return ApiResponse.notFound(res,"Invalid coupon!")
        coupon.code = code;
        coupon.discountType = discountType;
        coupon.discountValue = discountValue;
        coupon.minOrderAmount = minOrderAmount;
        coupon.maxDiscount = maxDiscount;
        coupon.isActive = isActive;
        coupon.validFrom = validFrom;
        coupon.validTill = validTill;
        coupon.usageLimit = usageLimit;
        coupon.usedCount = usedCount;
        await coupon.save();
        ApiResponse.success(res, "Coupon added successfully.", coupon);
    }
    catch (error) {
        return ApiResponse.error(res);
    }
}

exports.single = async(req, res)=>{
    try{
        const id = req.params.id;
        const coupon = await Coupon.findById(id);
        if(!coupon) return ApiResponse.notFound(res,"Invalid coupon!");
        ApiResponse.success(res,"Coupon fetched successfully.",coupon);
    }
    catch (error) {
        return ApiResponse.error(res);
    }
}

exports.all = async(req, res)=>{
    try{
        const coupon = await Coupon.find();
        ApiResponse.success(res,"Coupons fetched successfully.",coupon);
    }
    catch (error) {
        return ApiResponse.error(res);
    }
}

exports.deleteItem = async(req, res)=>{
    try{
        const id = req.params.id;
        const coupon = await Coupon.findByIdAndDelete(id);
        if(!coupon) return ApiResponse.notFound(res,"Invalid coupon!");
        ApiResponse.success(res,"Coupon deleted successfully.", coupon);
    }
    catch (error) {
        return ApiResponse.error(res);
    }
}