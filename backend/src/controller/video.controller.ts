import type { Request, Response } from "express";
import { processVideoForHLS } from "../services/video.service";
import  fs  from "fs";

export const videoUploader= async (req: Request, res: Response) => {
  if(!req.file){ // we will the uploaded video on req.file
      res.status(400).json({
      success: false,
      msg: "No file is uploaded"
     })
     return;
  };

  const videoPath= req.file.path;
  const outputPath= `output/${Date.now()}`;

  processVideoForHLS(videoPath, outputPath, (err, masterPlaylistPath) => {
    if(err) {
      res.status(500).json({
        msg: "An error occured while processing the video",
        success: false
      });
      return;
    };

    fs.unlink(videoPath , (err) => {  // Deleting the file after uploading
      if(err){
        console.log("An error occured while deleting the video file ", err);
      }
    })
    
    res.status(200).json({
      success: true,
      msg: "Video processed successfully",
      data: `/${masterPlaylistPath}`
    });
  })

  res.status(200).json({
    success: true,
    msg: "File uploaded successfully",
    videoPath,
  })
}