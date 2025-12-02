"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_routes_ts_1 = __importDefault(require("./video.routes.ts"));
const v1Router = express_1.default.Router();
v1Router.use("/videos", video_routes_ts_1.default);
v1Router.get("/ping", (_req, res) => {
    return res.json({
        msg: "pong",
        success: true
    });
});
exports.default = v1Router;
