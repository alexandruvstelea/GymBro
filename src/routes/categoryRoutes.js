import express from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", categoryController.insert);
categoryRouter.get("/get/all", categoryController.readAll);
categoryRouter.get("/get/:category_id", categoryController.readById);
categoryRouter.post("/update/:category_id", categoryController.update);
categoryRouter.delete("/delete/:category_id", categoryController.delete);

export default categoryRouter;
