import express from "express";
import planController from "../controllers/planController.js";

const planRouter = express.Router();

planRouter.post("/add", planController.create);
planRouter.get("/get/all", planController.readAll);
planRouter.get("/get/:plan_id", planController.readById);
planRouter.post("/update/:plan_id", planController.update);
planRouter.delete("/delete/:plan_id", planController.delete);
planRouter.get("/get/category/:category_id", planController.readByCategory);

export default planRouter;
