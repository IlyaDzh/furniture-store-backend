import express from "express";
import bcrypt from "bcrypt";

import { UserModel } from "../models";
import { IUser } from "../models/User";
import { createJWTToken } from "../utils";

class UserController {
    getMe = (req: any, res: express.Response) => {
        const userId: string =  req.user && req.user._id;
        UserModel.findById(userId, (err, user: IUser) => {
            if (err || !user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.status(200).json(user);
        });
    };

    create(req: express.Request, res: express.Response) {
        const postData = {
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        };
        const user = new UserModel(postData);
        user.save()
            .then((obj: any) => {
                res.status(200).json(obj);
            })
            .catch(reason => {
                res.status(500).json({ message: reason.message });
            });
    }

    login(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            password: req.body.password
        };

        UserModel.findOne({ email: postData.email }, (err, user: IUser) => {
            if (err || !user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            if (bcrypt.compareSync(postData.password, user.password)) {
                const token: string = createJWTToken(user);
                res.status(200).json({
                    status: "Success",
                    token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect password or email"
                });
            }
        });
    }
}

export default UserController;
