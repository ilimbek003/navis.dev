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
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

bdCnnection();

const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  cors({
    origin: "http://192.168.1.169:8000",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

auth(app);
personal(app);
getNews(app);
getReviews(app);
getCghange(app);

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My News API",
      version: "1.0.0",
      description: "API for fetching news",
    },
    servers: [
      {
        url: "http://192.168.1.169:8000",
      },
    ],
  },
  apis: ["./scr/main/news.js"],
};
const specs = swaggerJsdoc(options);
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
  branding: {
    companyName: "My Company Name",
  },
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

app.get("/admin/index", (req, res) => {
  res.render("index");
});

app.use(adminJs.options.rootPath, router);

app.listen(process.env.PORT || 8000, "192.168.1.169", function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
