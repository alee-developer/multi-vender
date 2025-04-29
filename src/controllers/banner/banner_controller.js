const ApiResponse = require('../../utils/api_response');
const Banner = require('../../models/banner/banner_model');

exports.add = async (req, res)=>{
    try{
        const {title,description,image,linkTo,position,startDate,endDate,isActive} = req.body;
        const banner = new Banner();
        banner.title = title;
        banner.description = description;
        banner.image = image;
        banner.linkTo = linkTo;
        banner.position = position;
        banner.startDate = startDate;
        banner.endDate = endDate;
        banner.isActive = isActive;
        await banner.save();
        ApiResponse.success(res,"Banner added successfully.", banner);
    }
    catch(error){
        return ApiResponse.error(res);
    }
}