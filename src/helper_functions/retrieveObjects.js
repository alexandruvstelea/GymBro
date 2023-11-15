import Exercise from "../models/Exercise.js";
import Workout from "../models/Workout.js";
import Plan from "../models/Plan.js";

const objectRetriever = {};

objectRetriever.getAllExercises = async () => {
  try {
    const exercises = await Exercise.find({}).exec();
    return exercises;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

objectRetriever.getAllWorkouts = async () => {
  try {
    const workout = await Workout.find({}).exec();
    return workout;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

objectRetriever.getAllPlans = async () => {
  try {
    const plan = await Plan.find({}).exec();
    return plan;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

objectRetriever.getExerciseById = async (id) => {
  try {
    const exercise = await Exercise.findById(id).exec();
    return exercise;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

objectRetriever.getWorkoutById = async (id) => {
  try {
    const workout = await Workout.findById(id).exec();
    return workout;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

objectRetriever.getPlanById = async (id) => {
  try {
    const plan = await Plan.findById(id).exec();
    return plan;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

objectRetriever.getWorkoutExercises = async (exercisesId) => {
  try {
    let exercises = [];
    for (const id of exerciseId) {
      let exercise = await objectRetriever.getExerciseById(id);
      exercises.push(exercise);
    }
    return exercises;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

objectRetriever.getPlanWorkouts = async (workoutsId) => {
  try {
    let workouts = [];
    for (const id of workoutsId) {
      let exercise = await objectRetriever.getWorkoutById(id);
      workouts.push(exercise);
    }
    return workouts;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

objectRetriever.getLatestExercise = async () => {
  try {
    const latestExercise = await Exercise.find()
      .sort({ _id: -1 })
      .limit(1)
      .exec();
    return latestExercise;
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

objectRetriever.getLatestWorkout = async () => {
  try {
    const latestWorkout = await Exercise.find()
      .sort({ _id: -1 })
      .limit(1)
      .exec();
    return latestWorkout;
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

objectRetriever.getLatestPlan = async () => {
  try {
    const latestPlan = await Plan.find().sort({ _id: -1 }).limit(1).exec();
    return latestPlan;
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

export default objectRetriever;
