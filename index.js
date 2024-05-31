import express from "express";
import bodyParser from "body-parser";
import { auth } from "./scr/auth/authAll.js";
import { personal } from "./scr/personal/personal-cabinet.js";
import { getNews } from "./scr/main/news.js";
import { getReviews } from "./scr/main/reviews.js";
import { getCghange } from "./scr/main/change.js";
import { bdCnnection } from "./scr/db/db.js";
import cors from "cors";
import changesBlock from "./scr/model/change.js";
import fetch from "node-fetch";
import cron from "node-cron";

const handleChanges = async () => {
  try {
    const url = "https://api.binance.com/api/v3/ticker/bookTicker";
    const response = await fetch(url);
    const data = await response.json();

    for (const ticker of data) {
      const { symbol, bidPrice, askPrice } = ticker;

      let change = await changesBlock.findOne({ name: symbol });

      if (change) {
        change.bay = bidPrice;
        change.sell = askPrice;
        change.date = new Date().toISOString();
        await change.save();
      } else {
        const newChange = new changesBlock({
          title: symbol,
          name: symbol,
          bay: bidPrice,
          sell: askPrice,
          date: new Date().toISOString(),
          type: "1",
        });
        await newChange.save();
      }
    }

    console.log("Changes updated successfully");
  } catch (error) {
    console.error("Error updating changes:", error);
  }
};

const app = express();
app.use(cors());
bdCnnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

auth(app);
personal(app);
getNews(app);
getReviews(app);
getCghange(app);

cron.schedule("*/30 * * * * *", () => {
  handleChanges();
});

app.listen(process.env.PORT || 4000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
