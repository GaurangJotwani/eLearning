import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
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
