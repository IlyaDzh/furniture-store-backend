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

    updateAbout(req: express.Request, res: express.Response) {
        const postData = {
            text: req.body.text,
            gallery_types: req.body.gallery_types,
            gallery: req.body.gallery,
            stages: req.body.stages
        };
        FactoryModel.findOneAndUpdate(
            {},
            { $set: { about: postData } },
            { new: true, upsert: true },
            (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(result.about);
            }
        );
    }

    updateContacts(req: express.Request, res: express.Response) {
        const postData = {
            number: req.body.number,
            email: req.body.email,
            time: req.body.time,
            address_office: req.body.address_office,
            address_prod: req.body.address_prod
        };
        FactoryModel.findOneAndUpdate(
            {},
            { $set: { contacts: postData } },
            { new: true, upsert: true },
            (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(result.contacts);
            }
        );
    }

    updateService(req: express.Request, res: express.Response) {
        const postData = {
            payment: req.body.payment,
            delivery: req.body.delivery
        };
        FactoryModel.findOneAndUpdate(
            {},
            { $set: { service: postData } },
            { new: true, upsert: true },
            (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(result.service);
            }
        );
    }
}

export default FactoryController;
