import express from "express";

import { CatalogModel } from "../models";
import { ICatalog } from "../models/Catalog";

class CatalogController {
    showByPath(req: express.Request, res: express.Response) {
        const path: string = req.params.path;
        CatalogModel.findOne({ path: path })
            .populate("products")
            .exec((err, catalog) => {
                if (err || !catalog) {
                    return res.status(404).json({ message: "Catalog not found" });
                }
                res.status(200).json(catalog);
            });
    }

    create(req: any, res: express.Response) {
        const admin: string = req.user && req.user.admin;
        if (!admin) {
            return res.status(403).json({ message: "No access" });
        }

        const postData = {
            title: req.body.title,
            path: req.body.path,
            categories: req.body.categories
        };
        const catalog = new CatalogModel(postData);
        catalog
            .save()
            .then((obj: ICatalog) => {
                res.status(200).json(obj);
            })
            .catch(reason => {
                res.status(500).json({ message: reason.message });
            });
    }
}

export default CatalogController;
