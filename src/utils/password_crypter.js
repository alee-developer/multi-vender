const bcrypt = require('bcryptjs');

exports.passwordEncoder = async (value,count)=>{
    return await bcrypt.hash(value,count);
}

exports.passwordDecoder = async(value, valueHash)=>{
    return await bcrypt.compare(value,valueHash);
}