import express from "express";
import renderUser from "../controllers/userRenderingController.js";

const userRouter = express.Router();

userRouter.get("/", renderUser.landingPage);

userRouter.get("/index", renderUser.index);
userRouter.get("/new", renderUser.new);

userRouter.get("/exercises", renderUser.exercises);
userRouter.get("/exercises/:categoryId", renderUser.exercisesByCategory);
userRouter.get("/workouts", renderUser.workouts);
userRouter.get("/workouts/:categoryId", renderUser.workoutsByCategory);
userRouter.get("/plans", renderUser.plans);
userRouter.get("/plans/:categoryId", renderUser.plansByCategory);

userRouter.get("/exercise/:exerciseId", renderUser.exercise);
userRouter.get("/workout/:workoutId", renderUser.workout);
userRouter.get("/plan/:planId", renderUser.plan);

userRouter.get("/contact", renderUser.contact);

userRouter.get("/admin", renderUser.admin);

userRouter.get("/wip", renderUser.wip);

export default userRouter;
