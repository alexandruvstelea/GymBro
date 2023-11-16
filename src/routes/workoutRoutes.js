import express from "express";
import workoutController from "../controllers/workoutController.js";

const workoutRouter = express.Router();

workoutRouter.post("/add", workoutController.create);
workoutRouter.post("/update/:workoutId", workoutController.update);
workoutRouter.delete("/delete/:workoutId", workoutController.delete);
workoutRouter.get(
  "/get/category/:categoryId",
  workoutController.readByCategory
);

export default workoutRouter;
