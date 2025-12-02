"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_config_ts_1 = require("./config/index.config.ts");
const index_ts_1 = __importDefault(require("./routes/index.ts"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/api", index_ts_1.default);
app.listen(index_config_ts_1.serverConfig.PORT, () => {
    console.log("Server is started at port no.: ", index_config_ts_1.serverConfig.PORT);
});
