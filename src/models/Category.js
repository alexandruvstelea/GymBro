import mongoose from "../../db";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category_for: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
