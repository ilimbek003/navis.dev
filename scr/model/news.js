import mongoose from "mongoose";

const newMain = new mongoose.Schema({
  img: String,
  title: String,
  decription: String,
  link: String,
  date: String,
});

const news = mongoose.model("news", newMain);

export default news;
