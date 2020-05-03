import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import {
    UserController,
    FactoryController,
    NewsController,
    CommentsController
} from "../controllers";
import { checkAuth } from "../middlewares";

const createRoutes = (app: express.Express) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(checkAuth);

    const User = new UserController();
    const Factory = new FactoryController();
    const News = new NewsController();
    const Comments = new CommentsController();

    app.get("/user/me", User.getMe);
    app.post("/user/signup", User.create);
    app.post("/user/signin", User.login);
    app.put("/user/update", User.update);

    app.get("/info/about", Factory.showAbout);
    app.get("/info/service", Factory.showService);
    app.get("/info/contacts", Factory.showContacts);
    app.put("/info/about", Factory.updateAbout);
    app.put("/info/service", Factory.updateService);
    app.put("/info/contacts", Factory.updateContacts);

    app.get("/news", News.showAll);
    app.get("/news/last", News.showLast);
    app.get("/news/:id", News.showById);
    app.post("/news", News.create);
    app.put("/news/:id", News.update);
    app.delete("/news/:id", News.delete);

    app.get("/comments", Comments.showAll);
    app.get("/comments/last", Comments.showLast);
    app.post("/comments", Comments.create);
    app.put("/comments/:id", Comments.update);
    app.delete("/comments/:id", Comments.delete);
};

export default createRoutes;
