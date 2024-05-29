import mongoose from "mongoose";

export const bdCnnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ilimbek:44452344@cluster0.sm8w4fc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DB connected");
  } catch (error) {
    console.log("DB error", error);
  }
};

