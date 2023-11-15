import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mainRouter from "./src/routes/renderingRoutes.js";
import exerciseRouter from "./src/routes/exerciseRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import workoutRouter from "./src/routes/workoutRoutes.js";
import planRouter from "./src/routes/planRoutes.js";

const app = express();
const port = 3030;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/render", mainRouter);
app.use("/exercises", exerciseRouter);
app.use("/categories", categoryRouter);
app.use("/workout", workoutRouter);
app.use("/plan", planRouter);

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public", "images"))
);
app.use(
  "/public/audio",
  express.static(path.join(__dirname, "public", "audio"))
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
