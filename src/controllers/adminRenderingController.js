import categoryController from "./categoryController.js";
import exerciseController from "./exerciseController.js";
import workoutController from "./workoutController.js";
import planController from "./planController.js";
import formatter from "./formatter.js";

const renderAdmin = {};

renderAdmin.index = (req, res) => {
  res.render("adminIndex");
};

renderAdmin.exercises = async (req, res) => {
  const exercises = await exerciseController.readAll();
  let entities = [];
  if (exercises.length === 0) {
    entities.push({
      title: "No Exercises",
      attribute: "No exercises available",
      id: null,
    });
  } else {
    for (const exercise of exercises) {
      const category = await categoryController.readById(exercise.category);
      entities.push({
        title: exercise.name,
        difficulty: await formatter.formatDifficulty(exercise.difficulty),
        duration: await formatter.formatDuration(exercise.duration),
        category: category ? category.name : "Unknown",
        date_added: await formatter.formatDate(exercise.date_added),
        id: exercise.id,
      });
    }
  }
  res.render("adminExercises", { entities });
};

renderAdmin.add = async (req, res) => {
  const categories = await categoryController.readByEntity("exercises");
  res.render("addExercise", { categories });
};

renderAdmin.edit = async (req, res) => {
  let id = req.params.exerciseId;
  const categories = await categoryController.readByEntity("exercises");
  const exercise = await exerciseController.readById(id);
  res.render("editExercise", { categories, exercise });
};

export default renderAdmin;
