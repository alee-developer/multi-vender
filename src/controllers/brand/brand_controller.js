const ApiResponse = require("../../utils/api_response");
const Brand = require('../../models/brand/brand_model');

exports.add = async(req,res)=>{
    try{
        const {name,description,logo,isPopular,isActive} = req.body;
        const brand = new Brand();
        brand.name = name;
        brand.description = description;
        brand.logo = logo;
        brand.isPupolar = isPopular;
        brand.isActive = isActive;
        await brand.save();
        ApiResponse.success(res,"Brand added successfully.",brand);
    }
    catch(error){
        return ApiResponse.error(res);
    }
}
exports.update = async(req,res)=>{
    try{
        const id = req.params.id;
        const {name,description,logo,isPopular,isActive} = req.body;
        const brand = await Brand.findById(id);
        if(!brand) return ApiResponse.notFound(res,"Invalid brand")
        brand.name = name;
        brand.description = description;
        brand.logo = logo;
        brand.isPupolar = isPopular;
        brand.isActive = isActive;
        await brand.save();
        ApiResponse.success(res,"Brand updated successfully.",brand);
    }
    catch(error){
        return ApiResponse.error(res);
    }
}

exports.single = async(req,res)=>{
    try{
        const id = req.params.id;
        const brand = await Brand.findById(id);
        if(!brand) return ApiResponse.notFound(res,"Invalid brand");
        ApiResponse.success(res,"Brand fetched successfully.",brand);
    }
    catch(error){
        return ApiResponse.error(res);
    }
}

exports.all = async(req,res)=>{
    try{
        const brands = await Brand.find();
        ApiResponse.success(res,"Brands fetched successfully.",brands);
    }
    catch(error){
        return ApiResponse.error(res);
    }
}

exports.deleteBrand = async(req,res)=>{
    try{
        const id = req.params.id;
        const brand = await Brand.findByIdAndDelete(id);
        if(!brand) return ApiResponse.notFound(res,"Invalid brand");
        ApiResponse.success(res,"Brand deleted successfully.",brand);
    }
    catch(error){
        return ApiResponse.error(res);
    }
}