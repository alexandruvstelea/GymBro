import express from "express";
import exerciseController from "../controllers/exerciseController.js";

const exerciseRouter = express.Router();

exerciseRouter.post("/add", exerciseController.create);
exerciseRouter.get("/get/all", exerciseController.readAll);
exerciseRouter.get("/get/id/:exercise_id", exerciseController.readById);
exerciseRouter.post("/update/:exercise_id", exerciseController.update);
exerciseRouter.delete("/delete/:exercise_id", exerciseController.delete);
exerciseRouter.get(
  "/get/category/:category_id",
  exerciseController.readByCategory
);

export default exerciseRouter;
