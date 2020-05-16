import express from "express";

import { ProductModel, CatalogModel } from "../models";
import { IProduct } from "../models/Product";

class ProductController {
    showById(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        ProductModel.findById(id)
            .populate("type", "title path")
            .exec((err, product) => {
                if (err || !product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                res.json(product);
            });
    }

    create(req: any, res: express.Response) {
        const admin: string = req.user && req.user.admin;
        if (!admin) {
            return res.status(403).json({ message: "No access" });
        }

        const postData = {
            type: req.body.type,
            new: req.body.new,
            hit: req.body.hit,
            name: req.body.name,
            images: req.body.images,
            chars: req.body.chars,
            price: req.body.price
        };
        const product = new ProductModel(postData);
        product
            .save()
            .then((obj: IProduct) => {
                CatalogModel.findByIdAndUpdate(
                    postData.type,
                    { $push: { products: obj._id } },
                    { upsert: true },
                    err => {
                        if (err) {
                            return res.status(500).json({ message: err });
                        }
                    }
                );

                res.status(200).json(obj);
            })
            .catch(reason => {
                res.status(500).json({ message: reason.message });
            });
    }

    getNew(req: express.Request, res: express.Response) {
        ProductModel.find({ new: true }, (err, products) => {
            if (err || !products) {
                return res.status(404).json({ message: "New products not found" });
            }
            res.json(products);
        });
    }

    getPopular(req: express.Request, res: express.Response) {
        ProductModel.find({ hit: true }, (err, products) => {
            if (err || !products) {
                return res
                    .status(404)
                    .json({ message: "Popular products not found" });
            }
            res.json(products);
        });
    }
}

export default ProductController;
