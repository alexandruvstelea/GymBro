import express from "express";
import planController from "../controllers/planController.js";

const planRouter = express.Router();

planRouter.post("/add", planController.create);
planRouter.post("/update/:planId", planController.update);
planRouter.delete("/delete/:planId", planController.delete);
planRouter.get("/get/category/:categoryId", planController.readByCategory);

export default planRouter;
