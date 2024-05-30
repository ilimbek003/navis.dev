import news from "../model/news.js";

export const getNews = (app) => {
  app.get("/news", async (req, res) => {
    try {
      const newsItems = await news.find();
      в;
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
      const newsData = new news({
        img: "",
        title: "",
        decription: "",
        link: "",
        date: "",
      });

      await newsData.save();
      res.status(200).json({ message: "News created successfully" });
    } catch (error) {
      res.satus(500).json({ error: "Internal Server Error" });
    }
  });

  app.patch("/update-news", async (req, res) => {
    try {
      const { _id, img, title, description, link, date } = req.body;
      if (!_id) {
        return res.status(400).json({ error: "News ID is required" });
      }
      const newsData = await news.findOne({ _id: req.body_id });
      if (!newsData) {
        return res.status(404).json({ error: "News not found" });
      }
      newsData._id = _id || newsData._id;
      newsData.img = img || newsData.img;
      newsData.title = title || newsData.title;
      newsData.description = description || newsData.description;
      newsData.link = link || newsData.link;
      newsData.date = date || newsData.date;

      await newsData.save();
      res.status(200).json({ message: "News updated successfully" });
    } catch (error) {
      console.error("Error updating news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
