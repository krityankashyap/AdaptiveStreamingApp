import dotenv from "dotenv"


type serverConfig= {
  PORT: number,
};

function loadENV() {
  dotenv.config();
  console.log("Environment variable loaded");
};

loadENV();

export const serverConfig: serverConfig= {
 PORT: Number(process.env.PORT),
}