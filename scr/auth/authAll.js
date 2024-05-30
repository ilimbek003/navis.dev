import User from "../model/order.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import { authenticate } from "../token/authenticate.js";

const jwtToken = (id) => {
  return jwt.sign({ _id: id }, "secret", { expiresIn: "1h" });
};

export const auth = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { email, confirm_password, password } = req.body;
      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: "Некорректный email" });
      }
      if (!password || !validator.isLength(password, { min: 8 })) {
        return res
          .status(400)
          .json({ error: "Пароль должен содержать не менее 8 символов" });
      }
      if (password !== confirm_password) {
        return res.status(400).json({ error: "Пароли не совпадают" });
      }
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

  app.patch("/new_password", authenticate, async (req, res) => {
    try {
      const { old_password, password, confirm_password } = req.body;
      if (!password || !validator.isLength(password, { min: 8 })) {
        return res
          .status(400)
          .json({ error: "Пароль должен содержать не менее 8 символов" });
      }
      if (password !== confirm_password) {
        return res.status(400).json({ error: "Пароли не совпадают" });
      }
      const user = await User.findOne({ _id: req.user._id });
      if (!user || user.password !== old_password) {
        return res.status(401).json({ error: "Неверный старый пароль" });
      }
      user.password = password;
      await user.save();
      res.status(200).json({
        response: true,
        message: "Пароль успешно обновлен",
      });
    } catch (error) {
      console.error("Ошибка обновления пароля:", error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  });
};
