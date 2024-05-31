import news from "../model/news.js";

export const getNews = (app) => {
  app.get("/news", async (req, res) => {
    try {
      const newsItems = await news.find();
      if (!newsItems.length) {
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
  app.patch("/update-news/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
      const { img, title, description, link, date } = req.body;
      const newsData = await news.findByIdAndUpdate(
        _id,
        {
          img,
          title,
          description,
          link,
          date,
        },
        { new: true }
      );

      if (!newsData) {
        return res.status(404).json({ error: "News not found" });
      }
      res
        .status(200)
        .json({ message: "News updated successfully", news: newsData });
    } catch (error) {
      console.error("Error updating news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.get("/news/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
      const newsData = await news.findById(_id);
      if (!newsData) {
        return res.status(404).json({ error: "News not found" });
      } else {
        res.status(200).json({ news: newsData });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
