import mongoose from "mongoose";

const review = new mongoose.Schema({
  name: String,
  messages: String,
  date: String,
});

const resiews = mongoose.model("review", review);

export default resiews;
