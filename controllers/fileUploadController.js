const path = require('path');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../errors');

const uploadFile  = async (req,res)=>{

    if(!req.files)
        throw new BadRequestError('No file Uploaded');
    
    const fileObject = req.files.upfile
    console.log(`File uploaded: `,fileObject);

    // const uploadPath = path.join(__dirname,'../public/uploads/'+fileObject.name);
    // await fileObject.mv(uploadPath);

    return res
        .status(StatusCodes.OK)
        .json({
            name:fileObject.name,
            type:fileObject.mimetype,
            size:fileObject.size
        });
}

module.exports = {uploadFile};