import type { Request, Response } from "express";
import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, avatar } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashed, name, avatar });
    res.status(201).json({ message: "User Registered successfully" });

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      accessToken: generateAccessToken(user._id.toString()),
      refreshToken: generateRefreshToken(user._id.toString()),
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ sucess: false, msg: "login error" });
  }
};
