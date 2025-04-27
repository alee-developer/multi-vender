const Category = require('../../models/category/category_model');
const ApiResponse = require('../../utils/api_response');


exports.add = async(req,res)=>{
    try{
        const {name,slug,image,isActive} = req.body;
        const category = new Category();
        category.name = name;
        category.slug = slug;
        category.image = image;
        category.isActive = isActive;
        await category.save();
        ApiResponse.success(res,"Category added successfully.",category);
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}
exports.update = async(req,res)=>{
    try{
        const id = req.params.id;
        const {name,slug,image,isActive} = req.body;
        const category =  await Category.findById(id);
        if(!category) return ApiResponse.notFound(res,"Invalid category");
        category.name = name;
        category.slug = slug;
        category.image = image;
        category.isActive = isActive;
        await category.save();
        ApiResponse.success(res,"Category added successfully.",category);
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}

exports.single = async(req,res)=>{
    try{
        const id = req.params.id;
    const category = await Category.findById(id);
    if(!category) return ApiResponse.notFound(res,"Invalid category");
    ApiResponse.success(res,"Category fetched successfully.",category);
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}

exports.all = async (req,res)=>{
    try{
        const categories = await Category.find();
        ApiResponse.success(res,"Categories fetched successfully.",categories)
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}

exports.deleteItem = async(req,res)=>{
    try{
        const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if(!category) return ApiResponse.notFound(res,"Invalid category");
    ApiResponse.success(res,"Category deleted successfully.",category);
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}


