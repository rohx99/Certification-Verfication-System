import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  c_id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  s_date: {
    type: String,
    required: true,
  },
  e_date: {
    type: String,
    required: true,
  },
});

const Record = mongoose.model("Record", recordSchema);

export default Record;
