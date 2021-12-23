const { Schema } = require("mongoose");

const ClassSchema = new Schema({
  Room: Number,
  Description: String,
});

module.exports = ClassSchema;