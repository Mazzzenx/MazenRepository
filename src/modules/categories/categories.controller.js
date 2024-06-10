import { categoryModel } from "../../../databases/models/category.model.js";

import slugify from 'slugify'
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAyncError.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import ApiFeatures from "../../utils/APIFeatures.js";
import { uploadToCloudinar } from "../../utils/middleware/cloudinary.upload.js"


const createCategory = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name)
  req.body.image = req.file.filename
  const result = await uploadToCloudinar(req.file.path)
  console.log(result);
  if (!result.success)
    return result
  const url = result.data
  console.log("success");
  req.body.image = url 
  
  let results = new categoryModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});


const getAllCategories = catchAsyncError(async (req, res, next) => {
   let apiFeature = new ApiFeatures(categoryModel.find(), req.query).pagination().sort().search().fields();
   let results = await apiFeature.mongooseQuery;
  res.json({ message: "Done", results });
});

const getCategoryById = catchAsyncError(async (req, res, next) => {
    let {id} = req.params
  let results = await categoryModel.findById(id);
  res.json({ message: "Done", results });

})

const updateCategory=catchAsyncError( async (req, res, next) => {
    let { id } = req.params;
    let {name} = req.body
  let results = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name)}, { new: true });
 results && next(new AppError("not found category", 404));
  results && res.json({ message: "Done", results });

})

const deleteCategory = deleteOne(categoryModel);

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory

}
// const createCategory = catchAsyncError(async (req, res, next) => {
//   req.body.slug = slugify(req.body.name)
//   req.body.image = req.file.filename

//   let results = new categoryModel(req.body);
//   let added = await results.save();

//   res.status(201).json({ message: "added", added });
// });

// const getAllCategories = catchAsyncError(async (req, res, next) => {
//    let apiFeature = new ApiFeatures(categoryModel.find(), req.query).pagination().sort().search().fields();
//    let results = await apiFeature.mongooseQuery;

//   res.json({
//     results: results.length,
//     metadata: {
//       currentPage: 1, // Assuming it's the first page
//       numberOfPages: 1, // Assuming there's only one page
//       limit: 40 // Assuming the limit is always 40
//     },
//     data: [
//       {
//           "_id": "6439d61c0049ad0b52b90051",
//           "name": "Music",
//           "slug": "music",
//           "image": "https://ecommerce.routemisr.com/Route-Academy-categories/1681511964020.jpeg",
//       },
//       {
//           "_id": "6439d5b90049ad0b52b90048",
//           "name": "Men's Fashion",
//           "slug": "men's-fashion",
//           "image": "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg",
//       }]
//   });
// });

// const getCategoryById = catchAsyncError(async (req, res, next) => {
//   let { id } = req.params;
//   let results = await categoryModel.findById(id);

//   res.json({
//     message: "Done",
//     results: [results] // Wrap single result in an array
//   });
// });

// const updateCategory = catchAsyncError(async (req, res, next) => {
//   let { id } = req.params;
//   let { name } = req.body;
//   let results = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

//   if (!results) {
//     return next(new AppError("not found category", 404));
//   }

//   res.json({ message: "Done", results });
// });

// const deleteCategory = deleteOne(categoryModel);

// export {
//     createCategory,
//     getAllCategories,
//     getCategoryById,
//     updateCategory,
//     deleteCategory
// }
