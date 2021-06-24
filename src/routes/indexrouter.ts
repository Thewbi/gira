import express from "express";

var indexRouter = express.Router();

indexRouter.get('/', function (req, res, next) {
    res.send('ok');
});

export default indexRouter;
