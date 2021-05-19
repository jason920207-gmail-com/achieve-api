const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DateObjSchema = new Schema(
  {
    date: {
      type: String,
      required: true
    },
    tasks: {
      type: Map,
      of: Number
    }
  },
  { _id: true, timestamps: true }
)

module.exports = DateObj = mongoose.model('DateObj', DateObjSchema);