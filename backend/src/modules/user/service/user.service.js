const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new Error("User already exists");
  }

  const user = await User.create(data);

  // Remove password before returning
  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};

module.exports = {
  registerUser,
  loginUser,
};
