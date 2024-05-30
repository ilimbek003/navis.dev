import mongoose from "mongoose";

const newMain = new mongoose.Schema({
  img: String,
  title: String,
  decription: String,
  link: String,
  date: Date,
});

const news = mongoose.model("news", newMain);

export default news;
