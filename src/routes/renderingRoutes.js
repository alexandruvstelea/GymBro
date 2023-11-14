import express from "express";
import renderController from "../controllers/renderingController.js";

const mainRouter = express.Router();

mainRouter.get("/", renderController.landingPage);
mainRouter.get("/index", renderController.index);
mainRouter.get("/workouts", renderController.workouts);
mainRouter.get("/plans", renderController.plans);
mainRouter.get("/new", renderController.new);
mainRouter.get("/workout", renderController.workout);
mainRouter.get("/plan", renderController.plan);
mainRouter.get("/contact", renderController.contact);

export default mainRouter;
