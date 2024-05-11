const express = require("express");
const UserRouter = express.Router();
const User = require("../models/use");
const multer=require("multer")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let fileName = "";
const myStorage = multer.diskStorage({
  destination: "./uploads", // Destination folder for uploaded files
  filename: (req, file, redirect) => {
    //   cb(null,Date.now() + '-' + file.originalname);
    // Rename the file to include the timestamp
    let date = Date.now();
    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    fileName = fl;
  },
});
const upload = multer({ storage: myStorage });
UserRouter.post("/register", upload.any("image"), (req, res) => {
  let data = req.body;
  console.log(req.body);
  const user = new User(data);
  user.img = fileName;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(req.body.password, salt);
  user
    .save()
    .then((result) => {
      console.log(fileName);
      fileName = "";
      res.status(201).json({
        message: "done",
        user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
});
UserRouter.post("/login", async(req, res) => {
  const data = req.body;
  try {
    const result = await User.findOne({ email: data.email });
    if (result === null) {
      res.status(404).json({
        message: "email or password doesn't match ",
      });
    } else {
      const valid = bcrypt.compareSync(data.password, result.password);
      console.log(data,valid);
      if (!valid) {
        res.status(404).json({
          message: "email or password doesn't match ",
        });
      } else {
        const payload = {
          id: result._id,
          name: result.name,
        };
        const options = {
          expiresIn: "5h",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json(
          // message: "valid login",
          token
        );
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error,
    });
  }
});
UserRouter.get("/:id",(req,res)=>
{
    const { id } = req.params;
    User.findById(id)
      .then((result) => {
        res.status(200).json({
          message: `user that has id =>${id}`,
          user: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "server error",
          error: err,
        });
      });




})

module.exports = UserRouter;
