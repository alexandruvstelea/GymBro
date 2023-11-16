import mongoose from "../../db.js";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  workouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      required: true,
    },
  ],
  date_added: { type: Date, default: Date.now },
});

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
