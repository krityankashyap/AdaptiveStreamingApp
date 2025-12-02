"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoUploader = void 0;
const video_service_ts_1 = require("../services/video.service.ts");
const fs_1 = __importDefault(require("fs"));
const videoUploader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) { // we will the uploaded video on req.file
        res.status(400).json({
            success: false,
            msg: "No file is uploaded"
        });
        return;
    }
    ;
    const videoPath = req.file.path;
    const outputPath = `output/${Date.now()}`;
    (0, video_service_ts_1.processVideoForHLS)(videoPath, outputPath, (err, masterPlaylistPath) => {
        if (err) {
            res.status(500).json({
                msg: "An error occured while processing the video",
                success: false
            });
            return;
        }
        ;
        fs_1.default.unlink(videoPath, (err) => {
            if (err) {
                console.log("An error occured while deleting the video file ", err);
            }
        });
        res.status(200).json({
            success: true,
            msg: "Video processed successfully",
            data: `/${masterPlaylistPath}`
        });
    });
    res.status(200).json({
        success: true,
        msg: "File uploaded successfully",
        videoPath,
    });
});
exports.videoUploader = videoUploader;
