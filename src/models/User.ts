import mongoose, { Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";

export interface IUser extends Document {
    fullname: string;
    phone: string;
    email: string;
    password: string;
    address: string;
}

const UserSchema = new Schema(
    {
        fullname: {
            type: String,
            required: "Fullname is required"
        },
        phone: {
            type: String,
            required: "Phone number is required!",
            validate: [isMobilePhone, "Invalid phone number"]
        },
        email: {
            type: String,
            unique: true,
            required: "Email address is required!",
            validate: [isEmail, "Invalid email"]
        },
        password: {
            type: String,
            required: "Password is required"
        },
        address: String
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
