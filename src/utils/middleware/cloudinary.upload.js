import {cloudinaryConfig} from "../../config/cloud.js"

const uploadImageToCloudinary = async (file, publicId, path) => {
    try {
        console.log(cloudinaryConfig);
        const result = await  cloudinaryConfig.v2.uploader.upload(file, {
            folder: path,
            public_id: publicId,
            overwrite: true,
        },
            function (error, result) {
                if (error) {
                    return {
                        success: false,
                        statusCode: 500,
                        message: "something went wrong, could not upload media !"
                    }
                };
            });
        return {
            success: true,
            statusCode: 201,
            message: "success",
            data: result.url
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

export const uploadToCloudinar = uploadImageToCloudinary