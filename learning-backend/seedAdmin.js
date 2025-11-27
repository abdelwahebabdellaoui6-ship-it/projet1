import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const createAdmin = async () => {
  try {
    const admin = new Admin({
      email: "waheb@gmail.com",
      password: "123456" 
    });
    await admin.save();
    console.log("Admin created");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

createAdmin();
