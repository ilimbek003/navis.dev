import express from "express";
import bodyParser from "body-parser";
import { auth } from "./scr/auth/authAll.js";
import { personal } from "./scr/personal/personal-cabinet.js";
import { getNews } from "./scr/main/news.js";
import { getReviews } from "./scr/main/reviews.js";
import { getCghange } from "./scr/main/change.js";
import { bdCnnection } from "./scr/db/db.js";
import User from "./scr/model/order.js";
import cors from "cors";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import multer from "multer";

bdCnnection();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

auth(app);
personal(app);
getNews(app);
getReviews(app);
getCghange(app);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/admin/upload", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: false },
        },
      },
    },
  ],
});

const router = AdminJSExpress.buildRouter(adminJs);
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.use(adminJs.options.rootPath, router);

app.listen(process.env.PORT || 8000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
