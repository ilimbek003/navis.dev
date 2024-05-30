import User from "../model/order.js";
import validator from "validator";
import jwt from "jsonwebtoken";
const jwtToken = (id) => {
  return jwt.sign({ _id: id }, "secret", { expiresIn: "1h" });
};
export const auth = (app) => {
  app.post("/auth/register", async (req, res) => {
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
      const newUser = new User({ email, confirm_password, password });
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
  app.post("/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
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
};
