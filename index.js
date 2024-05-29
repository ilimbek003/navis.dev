import express from "express";
import bodyParser from "body-parser";
import { auth } from "./scr/auth/authAll.js";
import { bdCnnection } from "./scr/db/db.js";

const app = express();

bdCnnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

auth(app);

app.listen(4000, () => console.log("Server started on port 4000"));
