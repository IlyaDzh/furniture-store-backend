import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { UserController, NewsController, CommentsController } from "../controllers";
// import { checkAuth } from "../middlewares";

const createRoutes = (app: express.Express) => {
    app.use(cors());
    app.use(bodyParser.json());
    // app.use(checkAuth);

    const User = new UserController();
    const News = new NewsController();
    const Comments = new CommentsController();

    app.get("/user/me", User.getMe);
    app.post("/user/signup", User.create);
    app.post("/user/signin", User.login);
    app.delete("/user/:id", User.delete);

    app.get("/news", News.showAll);
    app.get("/news/:id", News.showById);
    app.post("/news", News.create);
    app.put("/news/:id", News.update);
    app.delete("/news/:id", News.delete);

    app.get("/comments", Comments.showAll);
    app.post("/comments", Comments.create);
    app.put("/comments/:id", Comments.update);
    app.delete("/comments/:id", Comments.delete);
};

export default createRoutes;
