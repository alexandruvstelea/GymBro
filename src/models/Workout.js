import mongoose from "../../db.js";

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
  ],
  date_added: { type: Date, default: Date.now },
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
