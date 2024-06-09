import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short subCategory name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category",
    },
  image: String
}, { timestamps: true })
// subCategorySchema.post('init', (doc) => {
//     if (doc.image) {
//         doc.image = process.env.BASE_URL + "subCategory/" + doc.image;
//     }
// });

export const subCategoryModel = mongoose.model('subCategory', subCategorySchema)


