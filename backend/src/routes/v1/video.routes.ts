import express from "express";
import { videoUploader } from "../../controller/video.controller.ts";
import upload from "../../middlewares/multer.middleware.ts";

const videoRouter= express.Router();

videoRouter.post("/upload", upload.single('videos'), videoUploader);

export default videoRouter;