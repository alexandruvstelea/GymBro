import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./src/routes/userRenderingRoutes.js";
import exerciseRouter from "./src/routes/exerciseRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import workoutRouter from "./src/routes/workoutRoutes.js";
import planRouter from "./src/routes/planRoutes.js";
import adminRouter from "./src/routes/adminRenderingRoutes.js";

const app = express();
const port = 3030;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/exercises", exerciseRouter);
app.use("/categories", categoryRouter);
app.use("/workouts", workoutRouter);
app.use("/plans", planRouter);
app.use("/admin", adminRouter);

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public", "images"))
);
app.use(
  "/public/audio",
  express.static(path.join(__dirname, "public", "audio"))
);
app.use("/public/JS", express.static(path.join(__dirname, "public", "JS")));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
