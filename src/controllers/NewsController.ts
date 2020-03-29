import express from "express";

import { NewsModel } from "../models";

class NewsController {
    showAll(req: express.Request, res: express.Response) {
        NewsModel.find({}, (err, news) => {
            if (err) {
                return res.status(404).json({
                    status: "Error",
                    message: "News list is empty"
                });
            }
            return res.json(news);
        });
    }

    showById(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        NewsModel.findById(id, (err, news) => {
            if (err) {
                return res.status(404).json({ message: "News not found" });
            }
            res.json(news);
        });
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            image: req.body.image,
            title: req.body.title,
            short_description: req.body.short_description,
            description: req.body.description
        };
        const news = new NewsModel(postData);
        news.save()
            .then((obj: any) => {
                res.json(obj);
            })
            .catch(reason => {
                res.status(404).json({ message: reason.message });
            });
    }

    update(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        const postData = {
            image: req.body.image,
            title: req.body.title,
            short_description: req.body.short_description,
            description: req.body.description
        };
        NewsModel.findByIdAndUpdate(id, { $set: postData }, { new: true }, (err, news) => {
            if (err) {
                return res.status(404).json({ message: "News not found" });
            }
            res.json(news);
        });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        NewsModel.findOneAndRemove({ _id: id })
            .then(news => {
                if (news) {
                    res.json({ message: `News '${news.title}' deleted` });
                }
            })
            .catch(() => {
                res.json({ message: `News not found` });
            });
    }
}

export default NewsController;
