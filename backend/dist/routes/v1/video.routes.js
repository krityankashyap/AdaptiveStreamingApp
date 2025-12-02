"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_controller_ts_1 = require("../../controller/video.controller.ts");
const multer_middleware_ts_1 = __importDefault(require("../../middlewares/multer.middleware.ts"));
const videoRouter = express_1.default.Router();
videoRouter.post("/upload", multer_middleware_ts_1.default.single('videos'), video_controller_ts_1.videoUploader);
exports.default = videoRouter;
