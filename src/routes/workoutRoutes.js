import express from "express";
import workoutController from "../controllers/workoutController.js";

const workoutRouter = express.Router();

workoutRouter.post("/add", workoutController.create);
workoutRouter.get("/get/all", workoutController.readAll);
workoutRouter.get("/get/:workout_id", workoutController.readById);
workoutRouter.post("/update/:workout_id", workoutController.update);
workoutRouter.delete("/delete/:workout_id", workoutController.delete);
workoutRouter.get(
  "/get/category/:category_id",
  workoutController.readByCategory
);

export default workoutRouter;
