import mongoose, { Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface IOrder extends Document {
    type: string;
    fullname: string;
    phone: string;
    email: string;
    address: string;
    cart: Array<{ product: string; count: number }>;
    payment: string;
    delivery: string;
    comment: string;
    time: string;
    date: Date;
}

const OrderSchema = new Schema(
    {
        type: {
            type: String,
            enum: [
                "Вызов замерщика",
                "Заказ звонка",
                "Оформление заказа",
                "Подписка на рассылку"
            ],
            required: "Type is required"
        },
        fullname: String,
        phone: String,
        email: {
            type: String,
            validate: [isEmail, "Invalid email"]
        },
        address: String,
        cart: [
            {
                product: String,
                count: Number
            }
        ],
        payment: String,
        delivery: String,
        comment: String,
        time: String,
        date: Date
    },
    {
        timestamps: true
    }
);

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
