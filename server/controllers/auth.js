import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    //check if our db has user with that email
    const user = await User.findOne({ email }).exex();
    if (!user) return res.status(400).send("No user found");

    const match = await comparePassword(password, user.password);

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;

    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again");
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and minium 6 characters long");
    }
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send("Email is taken");

    // hash the password
    const hashedPassword = await hashPassword(password);
    console.log("hashedPassword:", hashedPassword);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    console.log("Saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try Again");
  }
};
