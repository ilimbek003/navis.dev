const { User } = require("../models");

export const get = () => {
  app.get("/personal-cabinet", async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    res.status(200).json({ user });
  });
};
