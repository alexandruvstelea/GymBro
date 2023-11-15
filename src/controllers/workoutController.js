import Workout from "../models/Workout.js";

const workoutController = {};

workoutController.insert = async (req, res) => {
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

workoutController.readAll = async (req, res) => {
  try {
    const workouts = await Workout.find({}).exec();
    res.status(201).json({ all_workouts: workouts });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

workoutController.readById = async (req, res) => {
  try {
    let id = req.params.workout_id;
    const workout = await Workout.findById(id).exec();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

workoutController.update = async (req, res) => {
  try {
    let id = req.params.workout_id;
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
    let id = req.params.workout_id;
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

export default workoutController;