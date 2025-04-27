const ApiResponse = require('../../utils/api_response');
const VariantType = require('../../models/variant/variant_model');

exports.add = async (req,res)=>{
    try{
        const {name,inputType,options,isActive} = req.body;
        const variant = new VariantType();
        variant.name = name;
        variant.inputType = inputType;
        variant.options = options;
        variant.isActive = isActive;
        await variant.save();
    }
    catch(error){
        return ApiResponse.error(res);
    }
}

exports.update = async (req,res)=>{
    try{
        const id = req.params.id;
        const {name,inputType,options,isActive} = req.body;
        const variant = await VariantType.findById(id);
        variant.name = name;
        variant.inputType = inputType;
        variant.options = options;
        variant.isActive = isActive;
        await variant.save();
    }
    catch(error){
        return ApiResponse.error(res);
    }
}

exports.single = async(req,res)=>{
    try{
        const id = req.params.id;
        const variant = await VariantType.findById(id);
        if(!variant) return ApiResponse.notFound(res,"Invalid variant");
        ApiResponse.success(res,"Variant type fetched succsessfully.",variant);
    }
    catch(error){
        return ApiResponse.error(res);
    }
}

exports.all = async (req,res)=>{
    try{
        const variants = await VariantType.find();
        ApiResponse.success(res,"Variant types fetched successfully.",variants);
    }
    catch(error){
        return ApiResponse.error(res);
    }
}

exports.deleteVariant = async(req,res)=>{
    try{
        const id = req.params.id;
        const variant = await VariantType.findByIdAndDelete(id);
        if(!variant) return ApiResponse.notFound(res,"Invalid variant");
        ApiResponse.success(res,"Variant type deleted succsessfully.",variant);
    }
    catch(error){
        return ApiResponse.error(res);
    }
}