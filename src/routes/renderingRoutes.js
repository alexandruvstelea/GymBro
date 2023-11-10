import express from "express";
import renderController from "../controllers/renderingController.js";

const mainRouter = express.Router();

mainRouter.get("/", renderController.landingPage);
mainRouter.get("/index", renderController.index);

export default mainRouter;
