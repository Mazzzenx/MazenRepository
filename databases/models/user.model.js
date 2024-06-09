import mongoose from "mongoose";

import bcrypt from 'bcrypt';



const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'user name required'],
        minLength: [1, 'too short user name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email required'],
        minLength: 1,
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters long'],
    },
    phone: {
        type: String,
        required: [true, 'phone number required'],
    },
    profilePic: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    changePasswordAt:Date,
    isActive: {
        type: Boolean,
        default: true
    },
    wishList: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'product'
    }],
    address: [{
        city: String,
        street: String,
        phone:String
    }],
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true 
 })

// userSchema.pre("save", function   ()  {
//     this.password = bcrypt.hashSync(this.password,7)
// })


// userSchema.pre("findOneAndUpdate", function () {
//   this._update.password = bcrypt.hashSync(this._update.password, 7);
// });

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 7);
    }
    next();
});

userSchema.pre('findOneAndUpdate', function(next) {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 7);
    }
    next();
});

// userSchema.virtual('confirmPassword')
//     .get(function() {
//         return this._confirmPassword;
//     })
//     .set(function(value) {
//         this._confirmPassword = value;
//     });

//     userSchema.pre('save', function(next) {
//         if (this.password !== this.confirmPassword) {
//             const err = new Error('Passwords do not match');
//             next(err);
//         } else {
//             next();
//         }
//     });




export const userModel = mongoose.model('user', userSchema)



