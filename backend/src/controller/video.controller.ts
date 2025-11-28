import type { Request, Response } from "express";

export const videoUploader= async (req: Request, res: Response) => {
  if(!req.file){ // we will the uploaded video on req.file
      res.status(400).json({
      success: false,
      msg: "No file is uploaded"
     })
     return;
  };

  const videoPath= req.file.path;

  res.status(200).json({
    success: true,
    msg: "File uploaded successfully",
    videoPath,
  })
}