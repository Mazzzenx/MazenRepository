import express from 'express';
import * as productController from './product.controller.js'
import { uploadMixFiles } from '../../utils/middleware/fileUploads.js';
import { allowTo, protectRoutes } from '../auth/auth.controller.js';
const productRouter = express.Router();
import  { upload } from '../../utils/middleware/fileUploads.js';


productRouter
.route("/")
  .get(productController.getAllProduct)
  .post(
     upload.single("imgCover-pic"),
     upload.array('product-pic'),
    protectRoutes, // Apply authorization middleware
    productController.createProduct
  );















  // .route("/")
  // .get(productController.getAllProduct)
  // .post(upload.array("product-pic"),
  //   protectRoutes,
  //   // allowTo("user"),
  //   // uploadMixFiles("product", [
  //   //   { name: "imgCover", maxCount: 1 },
  //   //   { name: "images", maxCount: 8 },
  //   // ]),
  //   productController.createProduct
  // );


productRouter.route("/:id")
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);





export default productRouter;