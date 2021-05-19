const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  achievedTimes: {
    type: Number,
    default: 0,
    min: 0
  },
  color: {
    type: Number,
    default: 0,
    min: 0,
    max: 4
  },
  //* add user id in the future
  // user:{
  //   type: Schema.Types.ObjectId,
  //   ref: "users"
  // }
},
  { _id: true, timestamps: true }
)
module.exports = Task = mongoose.model('Task', TaskSchema);