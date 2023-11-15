import Exercise from "../models/Exercise.js";
import Workout from "../models/Workout.js";
import Plan from "../models/Plan.js";
import Category from "../models/Category.js";

const categoryRetriever = {};

categoryRetriever.getEntityCategories = async (type) => {
  try {
    const categories = await Category.find({ category_for: type }).exec();
    return categories;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

categoryRetriever.getCategoryById = async (id) => {
  try {
    const category = await Category.findById(id).exec();
    return category;
  } catch (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }
};

export default categoryRetriever;
