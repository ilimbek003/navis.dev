import changesBlock from "../model/change.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
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
  app.post("/change", upload.single("imgFile"), async (req, res) => {
    const { title, name, bay, sell, date, type } = req.body;
    const imgFile = req.file;
    const newChange = new changesBlock({
      title,
      name,
      bay,
      sell,
      date: date || new Date().toLocaleDateString(),
      type,
      img: imgFile ? imgFile.filename : "",
    });
    try {
      await newChange.save();
      res.status(201).json(newChange);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};
