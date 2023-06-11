import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import encryptdb from "./encrypt-db.js";
import { defaultErrorHandler } from "./utils.js";

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/encryptdb", encryptdb)

app.get("/", async (req,res) => {
    res.status(200).send("This is the encryption service database API.")
});

app.use(defaultErrorHandler);


const {SERVER_PORT} = process.env;
app.listen(SERVER_PORT,() => {
    console.log("Encryption API listening on port 3000")
}) 