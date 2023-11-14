import mongoose from "../../db.js";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
