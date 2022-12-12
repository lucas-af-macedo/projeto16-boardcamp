import express from "express";
import cors from "cors";
import router from "./Routes/indexRouter.js";
import { stripHtml } from "string-strip-html";

export const cleanStringData = (string) =>
	typeof string == "string" ? stripHtml(string).result.trim() : string;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(4000);
