import mongoose from "mongoose";

const newMain = new mongoose.Schema({
  img: { type: URL, required: true },
  title: { type: String, required: true },
  decription: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const news = mongoose.model("news", newMain);

export default news;
