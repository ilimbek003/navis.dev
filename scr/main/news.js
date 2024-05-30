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
};
