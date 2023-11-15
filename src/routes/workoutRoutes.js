import express from "express";
import workoutController from "../controllers/workoutController.js";

const workoutRouter = express.Router();

workoutRouter.post("/add", workoutController.insert);
workoutRouter.get("/get/all", workoutController.readAll);
workoutRouter.get("/get/:workout_id", workoutController.readById);
workoutRouter.post("/update/:workout_id", workoutController.update);
workoutRouter.delete("/delete/:workout_id", workoutController.delete);

export default workoutRouter;
