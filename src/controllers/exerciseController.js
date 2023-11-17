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
    res.redirect("/admin/exercises");
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

exerciseController.readAll = async () => {
  try {
    const exercises = await Exercise.find({}).exec();
    return exercises;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

exerciseController.readById = async (id) => {
  try {
    const exercise = await Exercise.findById(id).exec();
    return exercise;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

exerciseController.readByCategory = async (id) => {
  try {
    const exercises = await Exercise.find({ category: id }).exec();
    return exercises;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

exerciseController.update = async (req, res) => {
  try {
    let id = req.params.exerciseId;
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
    let id = req.params.exerciseId;
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

exerciseController.countExercises = async () => {
  try {
    const number_of_documents = await Exercise.countDocuments().exec();
    return number_of_documents;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

exerciseController.getLatestExercise = async () => {
  try {
    const latestExercise = await Exercise.find()
      .sort({ _id: -1 })
      .limit(1)
      .exec();
    return latestExercise;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

export default exerciseController;
