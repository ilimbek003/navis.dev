import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirm_password: { type: String, required: true },
  old_password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

export default User;
