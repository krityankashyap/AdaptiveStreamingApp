"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
function loadENV() {
    dotenv_1.default.config();
    console.log("Environment variable loaded");
}
;
loadENV();
exports.serverConfig = {
    PORT: Number(process.env.PORT),
};
