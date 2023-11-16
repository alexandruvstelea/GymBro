import express from "express";
import exerciseController from "../controllers/exerciseController.js";

const exerciseRouter = express.Router();

exerciseRouter.post("/add", exerciseController.create);
exerciseRouter.post("/update/:exerciseId", exerciseController.update);
exerciseRouter.delete("/delete/:exerciseId", exerciseController.delete);
exerciseRouter.get(
  "/get/category/:category_id",
  exerciseController.readByCategory
);

export default exerciseRouter;
