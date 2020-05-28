import express from "express";

import { FactoryModel } from "../models";

class FactoryController {
    showAbout(req: express.Request, res: express.Response) {
        FactoryModel.findOne({}, "about", (err, result) => {
            if (err) {
                return res.status(404).json(err);
            }
            res.status(200).json(result?.about);
        });
    }

    showContacts(req: express.Request, res: express.Response) {
        FactoryModel.findOne({}, "contacts", (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result?.contacts);
        });
    }

    showService(req: express.Request, res: express.Response) {
        FactoryModel.findOne({}, "service", (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result?.service);
        });
    }

    update(req: any, res: express.Response) {
        const admin: string = req.user && req.user.admin;
        if (!admin) {
            return res.status(403).json({ message: "No access" });
        }

        const postData = {
            about: {
                text: req.body.text
            },
            contacts: {
                number: req.body.number,
                email: req.body.email,
                time: req.body.time,
                address_office: req.body.address_office,
                address_prod: req.body.address_prod
            }
        };
        FactoryModel.findOneAndUpdate(
            {},
            { $set: postData },
            { new: true, upsert: true },
            (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(result);
            }
        );
    }
}

export default FactoryController;
