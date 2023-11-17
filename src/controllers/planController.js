import Plan from "../models/Plan.js";
import Workout from "../models/Workout.js";
import workoutController from "./workoutController.js";

const planController = {};

planController.create = async (req, res) => {
  try {
    const workoutsIds = req.body.workouts;
    const workouts = await Workout.find({ _id: { $in: workoutsIds } });
    const totalDuration = workouts.reduce(
      (sum, workout) => sum + workout.duration,
      0
    );
    const averageDifficulty = Math.ceil(
      workouts.reduce((sum, workout) => sum + workout.difficulty, 0) /
        workouts.length
    );
    const new_plan = new Plan({
      name: req.body.name,
      description: req.body.description,
      difficulty: averageDifficulty,
      duration: totalDuration,
      category: req.body.category_id,
      workouts: req.body.workouts,
    });
    const result = await new_plan.save();
    res.status(201).json({ message: "Plan inserted successfully." });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

planController.readAll = async () => {
  try {
    const plans = await Plan.find({}).exec();
    return plans;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

planController.readById = async (id) => {
  try {
    const plan = await Plan.findById(id).exec();
    return plan;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

planController.readByCategory = async (id) => {
  try {
    const plans = await Plan.find({ category: id }).exec();
    return plans;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

planController.update = async (req, res) => {
  try {
    let id = req.params.planId;
    const plan = await Plan.findById(id).exec();
    if (!plan) {
      return res
        .status(404)
        .json({ error: `An error has occured ${error.message}` });
    }
    plan.name = req.body.new_name;
    plan.description = req.body.new_description;
    plan.difficulty = req.body.new_difficulty;
    plan.duration = req.body.new_duration;
    plan.category = req.body.new_category_id;
    plan.workouts = req.body.new_workouts;
    const updatedPlans = await plan.save();
    res.status(200).json({ message: "Plan updated succesfully." });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

planController.delete = async (req, res) => {
  try {
    let id = req.params.planId;
    const deletedPlan = await Plan.findByIdAndDelete(id).exec();
    if (!deletedPlan) {
      return res
        .status(404)
        .json({ error: `An error has occured ${error.message}` });
    }
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

planController.countPlans = async () => {
  try {
    const number_of_documents = await Plan.countDocuments().exec();
    return number_of_documents;
  } catch (error) {
    if (error.message.includes("buffering timed out")) {
      return 0;
    } else {
      throw new Error(`An error has occurred: ${error.message}`);
    }
  }
};

planController.getPlanWorkouts = async (workoutsId) => {
  try {
    let workouts = [];
    for (const id of workoutsId) {
      let exercise = await workoutController.readById(id);
      workouts.push(exercise);
    }
    return workouts;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

planController.getLatestPlan = async () => {
  try {
    const latestPlan = await Plan.find().sort({ _id: -1 }).limit(1).exec();
    return latestPlan;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

export default planController;
