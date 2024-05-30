import news from "../model/news.js";

export const getNews = (app) => {
  app.get("/news", async (req, res) => {
    try {
      const newsItems = await news.find();
      if (!newsItems) {
        return res.status(404).json({ error: "News not found" });
      }
      res.status(200).json({ news: newsItems });
    } catch (error) {
      console.error("Error fetching news:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/create-news", async (req, res) => {
    try {
      const newsDatas = new news({
        img: "",
        title: "",
        decription: "",
        link: "",
        date: "",
      });
      await newsDatas.save();
      res.status(200).json({ message: "News created successfully" });
    } catch (error) {
      res.satus(500).json({ error: "Internal Server Error" });
    }
  });

  app.patch("/update-news", async (req, res) => {
    const { id } = req.params;
    try {
      const { img, title, decription, link, date } = req.body;
      const newsDatas = await news.findOne({ id });
      newsDatas.img = img;
      newsDatas.title = title;
      newsDatas.decription = decription;
      newsDatas.link = link;
      newsDatas.date = date;
      await newsDatas.save();
      res.status(200).json({ message: "News updated successfully" });
    } catch (error) {
      res.satus(500).json({ error: "Internal Server Error" });
    }
  });
};
