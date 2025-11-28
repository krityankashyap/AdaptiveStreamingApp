import express from "express";
import { videoUploader } from "../../controller/video.controller.ts";

const videoRouter= express.Router();

videoRouter.post("/upload", videoUploader);

export default videoRouter;