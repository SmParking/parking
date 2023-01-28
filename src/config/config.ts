import dotenv from "dotenv";
dotenv.config();

const PORT: Number = Number(process.env.PORT) || 8000;

const config = {
    PORT: PORT,
    HOST: process.env.HOST
}

export default config;