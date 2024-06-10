
import slugify from 'slugify'
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAyncError.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import { productModel } from '../../../databases/models/product.model.js';
import ApiFeatures from '../../utils/APIFeatures.js';
import { uploadToCloudinar } from "../../utils/middleware/cloudinary.upload.js"

const createProduct = async (req, res, next) => {
  try {
    // Upload image and image array to Cloudinary
    const imgCoverUpload = await uploadToCloudinar(req.file.path);
    // const imagesUpload = await Promise.all(
    //   // req.files.images.map(async (image) => await uploadToCloudinar(image.path, "product-pic"))
    // );

      console.log("imgCoverUpload")


      console.log(imgCoverUpload)
    // Update product data with Cloudinary URLs
    req.body.slug = slugify(req.body.title);
    req.body.imgCover = imgCoverUpload.secure_url;
    req.body.images = imgCoverUpload.data

    // Create and save product
    let results = new productModel(req.body);
    let added = await results.save();

    res.status(201).json({ message: "added", added});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading to Cloudinary" });
  }
};
// //  catchAsyncError(

// const createProduct =
  
//   async (req, res, next) => {
//     console.log("adasdasdasdas");
//     req.body.slug = slugify(req.body.title);
//     req.body.imgCover = req.files.imgCover[0].filename;
//     req.body.images = req.files.images.map(ele => ele.filename)

  
//   let results = new productModel(req.body);
//   let added = await results.save();
//   res.status(201).json({ message: "added", added });
//   }

  // );

// skip ....limit
const getAllProduct = catchAsyncError(async (req, res, next) => {

 let apiFeature = new ApiFeatures(productModel.find(), req.query).pagination().sort().search().fields()
  let results = await apiFeature.mongooseQuery;
  res.json({ message: "Done", page: apiFeature.page, results });
});

const getProductById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await productModel.findById(id);
  res.json({ message: "Done", results });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { title } = req.body;
  if (req.body.title) {
    req.body.slug = slugify(title);
  }
  let results = await productModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

  !results && next(new AppError("not found Product", 404));
  results && res.json({ message: "Done", results });
});

const deleteProduct = deleteOne(productModel);

export {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct

















































}
