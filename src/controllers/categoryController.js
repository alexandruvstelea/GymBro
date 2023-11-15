import Category from "../models/Category.js";

const categoryController = {};

categoryController.insert = async (req, res) => {
  try {
    const new_category = new Category({
      name: req.body.name,
      category_for: req.body.for,
    });
    const result = await new_category.save();
    res.status(201).json({ message: "Category inserted successfully." });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

categoryController.readAll = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(201).json({ all_categories: categories });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

categoryController.readById = async (req, res) => {
  try {
    let id = req.params.category_id;
    const category = await Category.findById(id).exec();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

categoryController.update = async (req, res) => {
  try {
    let id = req.params.category_id;
    const category = await Category.findById(id).exec();
    if (!category) {
      return res
        .status(404)
        .json({ error: `An error has occured ${error.message}` });
    }
    category.name = req.body.new_name;
    category.category_for = req.body.new_for;

    const updatedCategory = await category.save();
    res.status(200).json({ message: "Category updated succesfully." });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

categoryController.delete = async (req, res) => {
  try {
    let id = req.params.category_id;
    const deletedCategory = await Category.findByIdAndDelete(id).exec();

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ error: `An error has occured ${error.message}` });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `An error has occured ${error.message}` });
  }
};

export default categoryController;
