import express from "express";

import { CommentsModel } from "../models";

class CommentsController {
    showAll(req: express.Request, res: express.Response) {
        const pageOptions = {
            page: parseInt(req.query.page) || 1,
            limit: 9
        };

        CommentsModel.find()
            .skip((pageOptions.page - 1) * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec((err, comments) => {
                if (err) {
                    return res.status(500).json(err);
                }
                CommentsModel.countDocuments({}, (err, count) => {
                    res.status(200).json({
                        page: pageOptions.page,
                        total_page: Math.ceil(count / pageOptions.limit),
                        results: comments
                    });
                });
            });
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            name: req.body.name,
            image: req.body.image,
            text: req.body.text,
            date: req.body.date
        };
        const comment = new CommentsModel(postData);
        comment
            .save()
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
            name: req.body.name,
            image: req.body.image,
            text: req.body.text,
            date: req.body.date
        };
        CommentsModel.findByIdAndUpdate(id, { $set: postData }, { new: true }, (err, comment) => {
            if (err) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.json(comment);
        });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        CommentsModel.findOneAndRemove({ _id: id })
            .then(comment => {
                if (comment) {
                    res.json({ message: `Comment by author '${comment.name}' deleted` });
                }
            })
            .catch(() => {
                res.json({ message: `News not found` });
            });
    }
}

export default CommentsController;
