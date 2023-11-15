import express from "express";
import renderController from "../controllers/renderingController.js";

const mainRouter = express.Router();

mainRouter.get("/", renderController.landingPage);

mainRouter.get("/index", renderController.index);
mainRouter.get("/new", renderController.new);

mainRouter.get("/exercises", renderController.exercises);
mainRouter.get("/workouts", renderController.workouts);
mainRouter.get("/plans", renderController.plans);

mainRouter.get("/exercise/:exercise_id", renderController.exercise);
mainRouter.get("/workout/:workout_id", renderController.workout);
mainRouter.get("/plan/:plan_id", renderController.plan);

mainRouter.get("/contact", renderController.contact);

export default mainRouter;
