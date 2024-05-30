import User from "../model/order.js";
import validator from "validator";
import jwt from "jsonwebtoken";

const jwtToken = (id) => {
  return jwt.sign({ _id: id }, "secret", { expiresIn: "1h" });
};

export const auth = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { email, oldPassword, password } = req.body;
      const isUser = await User.findOne({ email });
      if (isUser) {
        return res
          .status(409)
          .json({ error: "Пользователь с таким email уже существует" });
      }
      const newUser = new User({ email, password });
      await newUser.save();

      res.status(201).json({
        response: true,
        message: "Пользователь успешно зарегистрирован",
      });
    } catch (error) {
      console.error("Ошибка регистрации пользователя:", error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const token = jwtToken(user._id);
      res.status(200).json({
        response: true,
        message: "Вход в систему успешно выполнен",
        token,
        user,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/activation", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      res.status(200).json({
        response: true,
        message: "Вход в систему успешно выполнен",
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
