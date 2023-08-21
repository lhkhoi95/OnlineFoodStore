const mongoose = require("mongoose");

const BlackListTokensSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

BlackListTokensSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 });

module.exports = mongoose.model("BlackListTokens", BlackListTokensSchema);
