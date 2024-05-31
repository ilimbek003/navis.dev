import changesBlock from "../model/change.js";

export const getCghange = (app) => {
  app.get("/change", async (req, res) => {
    try {
      const { type } = req.query;
      let filter = {};
      if (type) {
        filter.type = type;
      }
      const change = await changesBlock.find(filter);
      res.status(200).json(change);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app.post("/change", async (req, res) => {
    const { title, name, bay, sell, date, type } = req.body;
    const newChange = new changesBlock({
      title,
      name,
      bay,
      sell,
      date: date || new Date().toLocaleDateString(),
      type,
    });
    try {
      await newChange.save();
      res.status(201).json(newChange);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};
