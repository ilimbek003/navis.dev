import news from "../model/news.js";

export const getNews = (app) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     News:
   *       type: object
   *       required:
   *         - title
   *         - content
   *       properties:
   *         _id:
   *           type: string
   *           description: The auto-generated id of the news
   *         title:
   *           type: string
   *           description: The title of the news
   *         content:
   *           type: string
   *           description: The content of the news
   *         date:
   *           type: string
   *           format: date-time
   *           description: The date the news was created
   *       example:
   *         _id: "60d0fe4f5311236168a109ca"
   *         title: "Breaking News"
   *         content: "This is the content of the breaking news."
   *         date: "2023-06-04T10:00:00Z"
   */

  /**
   * @swagger
   * /news:
   *   get:
   *     summary: Получить список новостей
   *     responses:
   *       200:
   *         description: Успешный ответ
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/News'
   */
  app.get("/news", async (req, res) => {
    try {
      const newsItems = await news.find();
      const newsData = { news: newsItems };
      res.render("index", newsData.description);
      res.status(200).json({ news: newsItems });
    } catch (error) {
      console.error("Error fetching news:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  /** 
   * @swagger
   * /news/{id}:
   *   get:
   *     summary: Получить новость по ID
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID новости
   *     responses:
   *       200:
   *         description: Успешный ответ
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/News'
   *       404:
   *         description: Новость не найдена
   *       500:
   *         description: Внутренняя ошибка сервера
   */
  app.get("/news/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const newsData = await news.findById(id);
      res.status(200).json({ news: newsData });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
