const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRequired = require("./verifyToken");
const BlackListTokens = require("../models/BlackListTokens");
const {
  registerValidation,
  loginValidation,
  updateValidation,
} = require("../validation/userValidation");

// REGISTER
router.post("/register", async (req, res) => {
  // VALIDATION
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF USER IS ALREADY IN THE DATABASE
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  // HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATE A NEW USER
  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json({
      user: savedUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // VALIDATE
  const { error } = loginValidation(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  // CHECK IF USER IS ALREADY IN THE DATABASE
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Email is not found");

  // PASSWORD IS CORRECT
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send("Password is incorrect");

  // CREATE and ASSIGN A JWT
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  // res.header("accessToken", token).send(token);
  return res.json({
    id: user.id,
    name: user.name,
    address: user.address,
    phone: user.phone,
    email: user.email,
    accessToken: token,
  });
});

// PARTIAL UPDATE USER
router.patch("/user/:id", async (req, res) => {
  try {
    // VALIDATE
    const { error } = updateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // HASH PASSWORD
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }

    // UPDATE USER
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser) return res.status(400).send("User not found");

    return res.send(updatedUser); // Return the updated user as a response
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// LOGOUT
router.post("/logout", loginRequired, async (req, res) => {
  try {
    // BLACKLIST TOKEN
    const token = req.headers["auth-token"];

    // ADD TOKEN TO BLACKLIST
    const blackListedToken = new BlackListTokens({
      token: token,
    });
    await blackListedToken.save();

    return res.send("Logged out");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// GET A SPECIFIC USER
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find the user by id
    if (!user) return res.status(400).send("User not found"); // If user not found, return 400 Bad Request
    return res.send(user); // Return the user as a response
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
});

// DELETE A USER
router.delete("/user/:id", async (req, res) => {
  try {
    // DELETE USER
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) return res.status(400).send("User not found");

    return res.send(deletedUser); // Return the deleted user as a response
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
