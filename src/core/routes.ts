import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import {
    UserController,
    CatalogController,
    ProductController,
    FactoryController,
    NewsController,
    CommentController,
    OrderController
} from "../controllers";
import { checkAuth } from "../middlewares";

const createRoutes = (app: express.Express) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(checkAuth);

    const User = new UserController();
    const Catalog = new CatalogController();
    const Product = new ProductController();
    const Factory = new FactoryController();
    const News = new NewsController();
    const Comment = new CommentController();
    const Order = new OrderController();

    app.get("/user/me", User.getMe);
    app.post("/user/signup", User.create);
    app.post("/user/signin", User.login);
    app.put("/user/update", User.update);

    app.get("/catalog/:id", Catalog.showById);
    app.post("/catalog/create", Catalog.create);

    app.get("/product/:id", Product.showById);
    app.post("/product/create", Product.create);

    app.get("/info/about", Factory.showAbout);
    app.get("/info/service", Factory.showService);
    app.get("/info/contacts", Factory.showContacts);
    app.put("/info/about", Factory.updateAbout);
    app.put("/info/service", Factory.updateService);
    app.put("/info/contacts", Factory.updateContacts);

    app.get("/news", News.showAll);
    app.get("/news/last", News.showLast);
    app.get("/news/:id", News.showById);
    app.post("/news/create", News.create);
    app.put("/news/:id", News.update);
    app.delete("/news/:id", News.delete);

    app.get("/comments", Comment.showAll);
    app.get("/comments/last", Comment.showLast);
    app.post("/comments/create", Comment.create);
    app.put("/comments/:id", Comment.update);
    app.delete("/comments/:id", Comment.delete);

    app.get("/orders", Order.showAll);
    app.post("/orders/create", Order.create);
};

export default createRoutes;
