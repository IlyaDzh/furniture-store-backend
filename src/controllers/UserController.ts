import express from "express";
import bcrypt from "bcrypt";

import { UserModel } from "../models";
import { IUser } from "../models/User";

class UserController {
    getMe = (req: any, res: express.Response) => {
        const id: string = req.user && req.user._id;
        UserModel.findById(id, (err, user: IUser) => {
            if (err || !user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.json(user);
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
                res.status(200).json({
                    status: "Success",
                    isAuth: true
                });
            } else {
                res.status(401).json({
                    message: "Incorrect password or email"
                });
            }
        });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findOneAndRemove({ _id: id })
            .then(user => {
                if (user) {
                    res.status(200).json({
                        message: `User '${user.fullname}' deleted`
                    });
                }
            })
            .catch(() => {
                res.status(404).json({ message: `User not found` });
            });
    }
}

export default UserController;
