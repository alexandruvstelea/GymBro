import mongoose from "../../db.js";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: Number, required: true },
  duration: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  date_added: { type: Date, default: Date.now },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
