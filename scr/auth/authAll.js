import { response } from "express";
import User from "../model/order.js";
import validator from "validator";

export const auth = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { email, oldPassword, password } = req.body;
      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: "Некорректный email" });
      }
      if (!password || !validator.isLength(password, { min: 8 })) {
        return res
          .status(400)
          .json({ error: "Пароль должен содержать не менее 8 символов" });
      }
      if (password !== oldPassword) {
        return res.status(400).json({ error: "Пароли не совпадают" });
      }
      const isUser = await User.findOne({ email });
      if (isUser) {
        return res
          .status(409)
          .json({ error: "Пользователь с таким email уже существует" });
      }
      const newUser = new User({ email, oldPassword, password });
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
      if (!user || user.password != password) {
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
  app.post("/activation", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user || user.password != password) {
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
