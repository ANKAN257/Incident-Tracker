const service = require("../service/user.service");
const { registerSchema, loginSchema } = require("../validator/user.validator");

const register = async (req, res, next) => {
  try {
    const validated = registerSchema.parse(req.body);
    const user = await service.registerUser(validated);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const validated = loginSchema.parse(req.body);
    const { user, token } = await service.loginUser(
      validated.email,
      validated.password
    );

    res
    .cookie("token",token,{httpOnly:true, secure:false,sameSite:"lax",maxAge:24*60*60*1000})
    .status(200)
    .json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    next(err);
  }
};


const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};




module.exports = {
  register,
  login,
  logout,
};
