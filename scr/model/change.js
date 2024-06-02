import mongoose from "mongoose";

const change = new mongoose.Schema({
  title: String,
  name: String,
  price: String,
  // sell: String,
  date: String,
  img: String,
  type: {
    type: String,
    enum: ["1", "2", "3"],
  },
});

const changesBlock = mongoose.model("changes", change);
export default changesBlock;
