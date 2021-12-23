const { Schema } = require("mongoose");

const ParentsSchema = new Schema({
  Name: String,
  Age: Number,
  Yob:Number,
  Parents: [{ type: Schema.Types.ObjectId, ref: 'Parents' }],
  Teacher: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
  Class: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
});

module.exports = ParentsSchema;