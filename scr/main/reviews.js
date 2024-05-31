import reviews from "../model/reviews.js";

export const getReviews = (app) => {
  app.get("/reviews", async (req, res) => {
    try {
      const revew = await reviews.find();
      res.status(200).json(revew);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app.post("/reviews", async (req, res) => {
    const { name, messages, date } = req.body;
    const newReview = new reviews({
      name,
      messages,
      date: date || new Date().toLocaleDateString(),
    });
    try {
      await newReview.save();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};
