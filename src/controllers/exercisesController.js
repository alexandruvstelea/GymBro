import Exercise from "../models/Exercises.js";

const exerciseController = {};

exerciseController.insert = async (req, res) => {
  try {
    const new_exercise = new Exercise({
      name: req.body.name,
      description: req.body.description,
      difficulty: req.body.difficulty,
      duration: req.body.duration,
    });
    const result = await new_exercise.save();
    console.log("Exercise inserted successfully:", result);
    res.status(201).json({ message: "Exercise inserted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exerciseController.readAll = async (req, res) => {
  try {
    const exercises = await Exercise.find({}).exec();
    res.status(201).json({ all_exercises: exercises });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exerciseController.readById = async (req, res) => {
  try {
    let id = req.params.exercise_id;
    const exercise = await Exercise.findById(id).exec();
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exerciseController.update = async (req, res) => {
  try {
    let id = req.params.exercise_id;
    const exercise = await Exercise.findById(id).exec();
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    exercise.name = req.body.new_name;
    exercise.description = req.body.new_description;
    exercise.difficulty = req.body.new_difficulty;
    exercise.duration = req.body.new_duration;
    const updatedExercise = await exercise.save();
    res.status(200).json({ message: "Exercise updated succesfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exerciseController.delete = async (req, res) => {
  try {
    let id = req.params.exercise_id;
    const deletedExercise = await Exercise.findByIdAndDelete(id).exec();

    if (!deletedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default exerciseController;
