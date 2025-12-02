import type { Request, Response } from "express";
import { processVideoForHLS } from "../services/video.service.ts";
import fs from "fs";

export const videoUploader = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      msg: "No file is uploaded"
    });
  }

  const videoPath = req.file.path;
  const outputPath = `output/${Date.now()}`;

  processVideoForHLS(videoPath, outputPath, (err, masterPlaylistPath) => {
    if (err) {
      return res.status(500).json({
        msg: "An error occurred while processing the video",
        success: false
      });
    }

    // delete original uploaded file
    fs.unlink(videoPath, (err) => {
      if (err) {
        console.log("Error deleting uploaded file:", err);
      }
    });

    // final response
    return res.status(200).json({
      success: true,
      msg: "Video processed successfully",
      data: `/${masterPlaylistPath}`
    });
  });

  // ❌ REMOVE THIS — it sends a second response!
  /*
  res.status(200).json({
    success: true,
    msg: "File uploaded successfully",
    videoPath,
  });
  */
};
