import Exercise from "../models/Exercise.js";

const exerciseController = {};

exerciseController.create = async (req, res) => {
  try {
    const new_exercise = new Exercise({
      name: req.body.name,
      description: req.body.description,
      difficulty: req.body.difficulty,
      duration: req.body.duration,
      category: req.body.category_id,
    });
    const result = await new_exercise.save();
    res.status(201).json({ message: "Exercise created successfully." });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

exerciseController.readAll = async (req, res) => {
  try {
    const exercises = await Exercise.find({}).exec();
    res.status(201).json({ all_exercises: exercises });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

exerciseController.readById = async (req, res) => {
  try {
    let id = req.params.exercise_id;
    const exercise = await Exercise.findById(id).exec();
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

exerciseController.readByCategory = async (req, res) => {
  try {
    let id = req.params.category_id;
    const exercise = await Exercise.find({ category: id }).exec();

    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: `An error has occurred: ${error.message}` });
  }
};

exerciseController.update = async (req, res) => {
  try {
    let id = req.params.exercise_id;
    const exercise = await Exercise.findById(id).exec();
    if (!exercise) {
      return res
        .status(404)
        .json({ error: `An error has occured ${error.message}` });
    }
    exercise.name = req.body.new_name;
    exercise.description = req.body.new_description;
    exercise.difficulty = req.body.new_difficulty;
    exercise.duration = req.body.new_duration;
    exercise.category = req.body.new_category_id;
    const updatedExercise = await exercise.save();
    res.status(200).json({ message: "Exercise updated succesfully." });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

exerciseController.delete = async (req, res) => {
  try {
    let id = req.params.exercise_id;
    const deletedExercise = await Exercise.findByIdAndDelete(id).exec();

    if (!deletedExercise) {
      return res
        .status(404)
        .json({ error: `An error has occured ${error.message}` });
    }

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

export default exerciseController;
