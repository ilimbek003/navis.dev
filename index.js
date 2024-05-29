import express from "express";
import bodyParser from "body-parser";
import { auth } from "./scr/auth/authAll.js";
import { bdCnnection } from "./scr/db/db.js";

const app = express();

bdCnnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

auth(app);

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
