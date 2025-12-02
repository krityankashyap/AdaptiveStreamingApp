import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import serveIndex from "serve-index";
import cors from "cors";
import { serverConfig } from "./config/index.config.ts";
import fs from "fs";
import apiRouter from "./routes/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORRECT: Only go up TWO levels → reaches Movie_streaming/
// Then enter "output"
const outputDir = path.resolve(__dirname, ".." ,"." , "output");

console.log("Serving HLS videos from:");
console.log("   →", outputDir);
console.log("   → Exists?", fs.existsSync(outputDir) ? "YES" : "NO");
if (fs.existsSync(outputDir)) {
  console.log("   → Videos inside:", fs.readdirSync(outputDir).join(", "));
}

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(
  "/output",
  serveIndex(outputDir, { icons: true, view: "details" }),
  express.static(outputDir)
);

// Right after you define outputDir
console.log("Output Path:", outputDir);
// Optional: Auto-play folder URLs
app.get("/output/:folder", (req, res, next) => {
  const m3u8 = path.join(outputDir, req.params.folder, "index.m3u8");
  if (fs.existsSync(m3u8)) {
    return res.redirect(`/output/${req.params.folder}/index.m3u8`);
  }
  next();
});

app.listen(serverConfig.PORT, () => {
  console.log(`HLS Server running at http://localhost:${serverConfig.PORT}`);
  console.log(`All videos → http://localhost:${serverConfig.PORT}/output`);
});