
import slugify from 'slugify'
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAyncError.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import { productModel } from '../../../databases/models/product.model.js';
import ApiFeatures from '../../utils/APIFeatures.js';


//  catchAsyncError(

const createProduct =
  
  async (req, res, next) => {
    console.log("adasdasdasdas");
    req.body.slug = slugify(req.body.title);
    req.body.imgCover = req.files.imgCover[0].filename;
    req.body.images = req.files.images.map(ele => ele.filename)

  
  let results = new productModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "added", added });
  }

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