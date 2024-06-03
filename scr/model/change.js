import mongoose from "mongoose";

const change = new mongoose.Schema({
  title: String,
  name: String,
  fiat: String,
  bay: String,
  sell: String,
  date: String,
  imagePath: String,
  type: {
    type: String,
    enum: ["1", "2", "3"],
  },
});

const changesBlock = mongoose.model("changes", change);
export default changesBlock;
