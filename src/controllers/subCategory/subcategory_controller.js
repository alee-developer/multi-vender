const SubCategory = require('../../models/subCategory/subcategory_model');
const ApiResponse = require('../../utils/api_response');


exports.add = async(req,res)=>{
    try{
        const {name,image,isActive,parentCategory} = req.body;
        const subcategory = new SubCategory();
        subcategory.name = name;
        subcategory.image = image;
        subcategory.parentCategory = parentCategory;
        subcategory.isActive = isActive;
        await subcategory.save();
        ApiResponse.success(res,"SubCategory added successfully.",subcategory);
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}
exports.update = async(req,res)=>{
    try{
        const id = req.params.id;
        const {name,image,isActive,parentCategory} = req.body;
        const subcategory =  await SubCategory.findById(id);
        if(!subcategory) return ApiResponse.notFound(res,"Invalid subcategory");
        subcategory.name = name;
        subcategory.image = image;
        subcategory.isActive = isActive;
        subcategory.parentCategory = parentCategory;
        await subcategory.save();
        ApiResponse.success(res,"SubCategory added successfully.",subcategory);
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}

exports.single = async(req,res)=>{
    try{
        const id = req.params.id;
    const subcategory = await SubCategory.findById(id);
    if(!subcategory) return ApiResponse.notFound(res,"Invalid subcategory");
    ApiResponse.success(res,"SubCategory fetched successfully.",subcategory);
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}

exports.all = async (req,res)=>{
    try{
        const subcategories = await SubCategory.find();
        ApiResponse.success(res,"SubCategories fetched successfully.",subcategories)
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}

exports.deleteItem = async(req,res)=>{
    try{
        const id = req.params.id;
    const subcategory = await SubCategory.findByIdAndDelete(id);
    if(!subcategory) return ApiResponse.notFound(res,"Invalid subcategory");
    ApiResponse.success(res,"SubCategory deleted successfully.",subcategory);
    }
    catch(error){
        return ApiResponse.error(res,error.message);
    }
}


