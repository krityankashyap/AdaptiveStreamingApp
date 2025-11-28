import express, {type Express} from "express";
import { serverConfig } from "./config/index.config.ts";
import apiRouter from "./routes/index.ts";
import cors from "cors"

const app: Express= express();

app.use(cors());

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, ()=>{
  console.log("Server is started at port no.: ", serverConfig.PORT);
})
