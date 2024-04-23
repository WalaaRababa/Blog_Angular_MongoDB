const mongoose = require("mongoose");
const User = mongoose.model("User", {
  name: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  about: { type: String },
  img: { type: String },
});
module.exports = User;
