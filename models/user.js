const mongoose = require("mongoose");

const contributorSchema = new mongoose.Schema({
  username: String,
  firstCommitDate: Date,
  lastCommitDate: Date,
});

module.exports = mongoose.model("Contributor", contributorSchema);
