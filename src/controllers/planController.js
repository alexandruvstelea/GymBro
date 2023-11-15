import Plan from "../models/Plan.js";

const planController = {};

planController.insert = async (req, res) => {
  try {
    const new_plan = new Plan({
      name: req.body.name,
      description: req.body.description,
      difficulty: req.body.difficulty,
      duration: req.body.duration,
      category: req.body.category_id,
      workouts: req.body.workouts,
    });
    const result = await new_plan.save();
    res.status(201).json({ message: "Plan inserted successfully." });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

planController.readAll = async (req, res) => {
  try {
    const plans = await Plan.find({}).exec();
    res.status(201).json({ all_plans: plans });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

planController.readById = async (req, res) => {
  try {
    let id = req.params.plan_id;
    const plan = await Plan.findById(id).exec();
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

planController.readByCategory = async (req, res) => {
  try {
    let id = req.params.category_id;
    const plan = await Plan.find({ category: id }).exec();

    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: `An error has occurred: ${error.message}` });
  }
};

planController.update = async (req, res) => {
  try {
    let id = req.params.plan_id;
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
    let id = req.params.plan_id;
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

export default planController;
