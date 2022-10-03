import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(4000, () =>
   console.log(`Magic happens on port 4000`)
);
