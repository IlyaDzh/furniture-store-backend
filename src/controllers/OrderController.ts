import express from "express";

import { OrderModel } from "../models";
import { IOrder } from "../models/Order";

class OrderController {
    showAll(req: express.Request, res: express.Response) {
        OrderModel.find()
            .sort({ createdAt: -1 })
            .exec((err, orders: IOrder[]) => {
                if (err) {
                    return res.status(500).json(err);
                }

                res.status(200).json(orders);
            });
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            type: req.body.type,
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            cart: req.body.cart,
            payment: req.body.payment,
            delivery: req.body.delivery,
            comment: req.body.comment,
            time: req.body.time,
            date: req.body.date
        };
        const order = new OrderModel(postData);
        order
            .save()
            .then((obj: any) => {
                res.status(200).json(obj);
            })
            .catch(reason => {
                res.status(500).json({ message: reason.message });
            });
    }
}

export default OrderController;
