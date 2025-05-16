const mongoose = require("mongoose");

const mb_for_user = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: String,
});

module.exports = mongoose.model("user", mb_for_user);
