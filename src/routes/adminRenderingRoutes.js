import express from "express";
import renderAdmin from "../controllers/adminRenderingController.js";

const adminRouter = express.Router();

adminRouter.get("/index", renderAdmin.index);

adminRouter.get("/exercises", renderAdmin.exercises);

export default adminRouter;
