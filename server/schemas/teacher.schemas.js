const { Schema } = require("mongoose");

const TeacherSchema = new Schema({
  Name: String,
  Age: Number,
  Address: String,
  Subject: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
});

module.exports = TeacherSchema;