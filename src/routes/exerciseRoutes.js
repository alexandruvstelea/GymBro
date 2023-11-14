import express from "express";
import exerciseController from "../controllers/exercisesController.js";

const exerciseRouter = express.Router();

exerciseRouter.post("/add", exerciseController.insert);
exerciseRouter.get("/get/all", exerciseController.readAll);
exerciseRouter.get("/get/:exercise_id", exerciseController.readById);
exerciseRouter.post("/update/:exercise_id", exerciseController.update);
exerciseRouter.delete("/delete/:exercise_id", exerciseController.delete);

export default exerciseRouter;
