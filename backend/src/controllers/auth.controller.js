const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({
    username, 
  });
  
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  
  const user = await userModel.create({ 
    username,
    password: await bcrypt.hash(password, 10)
  });
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
};

async function loginController(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({
    username,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "User logged in successfully",
    user,
  });
};

async function getUser (req, res)  {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findOne({
    _id: decoded.id,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User profile retrieved successfully",
    user,
  });
};

async function logoutController(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  registerController,
  loginController,
  getUser,
  logoutController
}