const { Schema } = require("mongoose");

const ParentsSchema = new Schema({
  DadName: String,
  MomName: String,
  Address:String
});

module.exports = ParentsSchema;