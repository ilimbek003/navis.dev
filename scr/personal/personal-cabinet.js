import User from "../model/order.js";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
};

export const personal = (app) => {
  app.get("/personal-cabinet", authenticate, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      res.status(200).json({ user });
      return res.status(404).json({ error: "User not found" });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(401).json({ error: "Токен жоок" });
    }
  });
};
