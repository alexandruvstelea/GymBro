import Exercise from "../models/Exercise.js";
import Workout from "../models/Workout.js";
import Plan from "../models/Plan.js";

const counter = {};

counter.countExercises = async () => {
  try {
    const number_of_documents = await Exercise.countDocuments().exec();
    return number_of_documents;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

counter.countWorkouts = async () => {
  try {
    const number_of_documents = await Workout.countDocuments().exec();
    return number_of_documents;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

counter.countPlans = async () => {
  try {
    const number_of_documents = await Plan.countDocuments().exec();
    return number_of_documents;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

export default counter;
