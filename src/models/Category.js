import mongoose from "../../db.js";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category_for: [{ type: String, required: true }],
  date_added: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
