import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";
import exerciseController from "./exerciseController.js";

const workoutController = {};

workoutController.create = async (req, res) => {
  try {
    const new_workout = new Workout({
      name: req.body.name,
      description: req.body.description,
      difficulty: req.body.difficulty,
      duration: req.body.duration,
      category: req.body.category_id,
      exercises: req.body.exercises,
    });
    const result = await new_workout.save();
    res.status(201).json({ message: "Workout inserted successfully." });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

workoutController.readAll = async () => {
  try {
    const workouts = await Workout.find({}).exec();
    return workouts;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

workoutController.readById = async (id) => {
  try {
    const workout = await Workout.findById(id).exec();
    return workout;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

workoutController.readByCategory = async (req, res) => {
  try {
    let id = req.params.categoryId;
    const workout = await Workout.find({ category: id }).exec();
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: `An error has occurred: ${error.message}` });
  }
};

workoutController.update = async (req, res) => {
  try {
    let id = req.params.workoutId;
    const workout = await Workout.findById(id).exec();
    if (!workout) {
      return res
        .status(404)
        .json({ error: `An error has occured ${error.message}` });
    }
    workout.name = req.body.new_name;
    workout.description = req.body.new_description;
    workout.difficulty = req.body.new_difficulty;
    workout.duration = req.body.new_duration;
    workout.category = req.body.new_category_id;
    workout.exercises = req.body.new_exercises;
    const updatedExercise = await workout.save();
    res.status(200).json({ message: "Workout updated succesfully." });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

workoutController.delete = async (req, res) => {
  try {
    let id = req.params.workoutId;
    const deletedWorkout = await Workout.findByIdAndDelete(id).exec();
    if (!deletedWorkout) {
      return res
        .status(404)
        .json({ error: `An error has occured ${error.message}` });
    }
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

workoutController.countWorkouts = async () => {
  try {
    const number_of_documents = await Workout.countDocuments().exec();
    return number_of_documents;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

workoutController.getWorkoutExercises = async (exercisesId) => {
  try {
    let exercises = [];
    for (const id of exercisesId) {
      let exercise = await exerciseController.readById(id);
      exercises.push(exercise);
    }
    return exercises;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

workoutController.getLatestWorkout = async () => {
  try {
    const latestWorkout = await Exercise.find()
      .sort({ _id: -1 })
      .limit(1)
      .exec();
    return latestWorkout;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

export default workoutController;
