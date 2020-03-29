import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/furniture", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});