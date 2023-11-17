import mongoose from "../../db.js";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category_for: [{ type: String, required: true }],
  date_added: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", categorySchema);

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

const generateCategoryData = async () => {
  try {
    const categories = [];
    for (let i = 0; i < 5; i++) {
      const category = new Category({
        name: `Category ${i + 1}`,
        category_for: [`CategoryFor ${i + 1}`],
      });
      await category.save();
      categories.push(category);
    }
    return categories;
  } catch (error) {
    console.error("Error generating Category data:", error);
  }
};

const generateExerciseData = async () => {};

const generatePlanData = async () => {};

const generateWorkoutData = async () => {};

const saveData = async () => {
  await generateCategoryData();
  await generateExerciseData();
  await generatePlanData();
  await generateWorkoutData();
};

saveData();
