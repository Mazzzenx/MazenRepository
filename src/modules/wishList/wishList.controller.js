
import slugify from 'slugify'
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAyncError.js";
import deleteOne from '../../utils/handlers/refactor.handler.js';
import ApiFeatures from '../../utils/APIFeatures.js';
import { userModel } from '../../../databases/models/user.model.js';



const addToWishList =
  catchAsyncError(
  
  async (req, res, next) => {

  let { product } = req.body;

    console.log(product);
  let results = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: product },
    },
    { new: true }
  );
  !results && next(new AppError("not found Review", 404));
  results && res.json({ message: "Done", results });
  }

  );


const removeFromWishList =
  catchAsyncError(
  
  async (req, res, next) => {

  let { product } = req.body;

    console.log(product);
  let results = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $pull: { wishList: product },
    },
    { new: true }
  ).populate("wishList");
  !results && next(new AppError("not found Review", 404));
  results && res.json({ message: "Done", results });
  }

   );

const getAllWishList =
  catchAsyncError(
  
  async (req, res, next) => {

  let results = await userModel.findOne({ _id: req.user._id })
  !results && next(new AppError("not found Review", 404));
  results && res.json({ message: "Done", results: results.wishList});
  }

  );




export { addToWishList, removeFromWishList, getAllWishList };
