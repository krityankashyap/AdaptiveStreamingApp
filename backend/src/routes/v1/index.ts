import express, { type Request, type Response } from "express";
import videoRouter from "./video.routes.ts";

const v1Router= express.Router();


v1Router.use("/video", videoRouter);


v1Router.get("/ping", (_req: Request, res: Response)=> {
  return res.json({
    msg: "pong",
    success: true 
  });
});

export default v1Router;