import express from "express";

import { NewsModel } from "../models";

class NewsController {
    showAll(req: express.Request, res: express.Response) {
        const pageOptions = {
            page: parseInt(req.query.page) || 1,
            limit: 9
        };

        NewsModel.find()
            .sort({ date: -1 })
            .skip((pageOptions.page - 1) * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec((err, news) => {
                if (err) {
                    return res.status(500).json(err);
                }
                NewsModel.countDocuments({}, (err, count) => {
                    const maxPage = Math.ceil(count / pageOptions.limit);

                    if (pageOptions.page > maxPage) {
                        return res.status(404).json({
                            message: `Page ${pageOptions.page} not found`
                        });
                    }

                    res.status(200).json({
                        page: pageOptions.page,
                        total_page: maxPage,
                        results: news
                    });
                });
            });
    }

    showById(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        NewsModel.findById(id, (err, news) => {
            if (err || !news) {
                return res.status(404).json({ message: "News not found" });
            }
            res.status(200).json(news);
        });
    }

    showLast(req: express.Request, res: express.Response) {
        NewsModel.find({}, "_id image title short_description date")
            .sort({ date: -1 })
            .limit(3)
            .exec((err, news) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(news);
            });
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            image: req.body.image,
            title: req.body.title,
            short_description: req.body.short_description,
            description: req.body.description,
            date: req.body.date
        };
        const news = new NewsModel(postData);
        news.save()
            .then((obj: any) => {
                res.status(200).json(obj);
            })
            .catch(reason => {
                res.status(500).json({ message: reason.message });
            });
    }

    update(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        const postData = {
            image: req.body.image,
            title: req.body.title,
            short_description: req.body.short_description,
            description: req.body.description,
            date: req.body.date
        };
        NewsModel.findByIdAndUpdate(
            id,
            { $set: postData },
            { new: true },
            (err, news) => {
                if (err) {
                    return res.status(404).json({ message: "News not found" });
                }
                res.status(200).json(news);
            }
        );
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        NewsModel.findOneAndRemove({ _id: id })
            .then(news => {
                if (news) {
                    res.status(200).json({
                        message: `News '${news.title}' deleted`
                    });
                }
            })
            .catch(() => {
                res.status(404).json({ message: `News not found` });
            });
    }
}

export default NewsController;
