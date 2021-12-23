const { Schema } = require("mongoose");

const SubjectSchema = new Schema({
  Title: String,
  Description: String,
});

module.exports = SubjectSchema;