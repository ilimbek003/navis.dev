import mongoose from "mongoose";

const change = new mongoose.Schema({
  title: String,
  name: String,
  bay: String,
  sell: String,
  date: String,
  type: {
    type: String,
    enum: ["1", "2", "3"],
  },
});

const changesBlock = mongoose.model("changes", change);
export default changesBlock;
