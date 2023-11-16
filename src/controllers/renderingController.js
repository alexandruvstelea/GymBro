import categoryController from "./categoryController.js";
import exerciseController from "./exerciseController.js";
import workoutController from "./workoutController.js";
import planController from "./planController.js";
import formatter from "./formatter.js";

const renderController = {};

renderController.landingPage = (req, res) => {
  res.render("landing");
};

renderController.index = async (req, res) => {
  const exercisesCount = await exerciseController.countExercises();
  const workoutCount = await workoutController.countWorkouts();
  const planCount = await planController.countPlans();

  let cardData = [
    {
      title: "Plans",
      description: "Plans description",
      itemCount: planCount,
    },
    {
      title: "Workouts",
      description: "Workouts description",
      itemCount: workoutCount,
    },
    {
      title: "Exercises",
      description: "Exercises description",
      itemCount: exercisesCount,
    },
  ];
  res.render("index", { cardData });
};

renderController.exercises = async (req, res) => {
  const exercises = await exerciseController.readAll();
  const categories = await categoryController.readByEntity("exercises");
  const metadata = {
    title: "Exercises",
    button: "View Exercise",
    endpoint: "exercise",
    image: "exercise",
  };
  let entities = [];
  if (exercises.length === 0) {
    entities.push({
      title: "No Exercises",
      attribute: "No exercises available",
      id: null,
    });
    metadata.button = "Not available";
    metadata.endpoint = "exercises";
  } else {
    exercises.forEach((exercise) => {
      entities.push({
        title: exercise.name,
        attribute: formatter.formatDifficulty(exercise.difficulty),
        id: exercise.id,
      });
    });
  }
  res.render("explorer", { entities, metadata, categories });
};

renderController.workouts = async (req, res) => {
  const workouts = await workoutController.readAll();
  const categories = await categoryController.readByEntity("workouts");
  const metadata = {
    title: "Workouts",
    button: "View Workout",
    endpoint: "workout",
    image: "workout",
  };
  let entities = [];
  if (workouts.length === 0) {
    entities.push({
      title: "No Workouts",
      attribute: "No workouts available",
      id: null,
    });
    metadata.button = "Not available";
    metadata.endpoint = "workouts";
  } else {
    workouts.forEach((workout) => {
      entities.push({
        title: workout.name,
        attribute: formatter.formatDifficulty(workout.difficulty),
        id: workout.id,
      });
    });
  }
  res.render("explorer", { entities, metadata, categories });
};

renderController.plans = async (req, res) => {
  const plans = await planController.readAll();
  const categories = await categoryController.readByEntity("plans");
  const metadata = {
    title: "Plans",
    button: "View Plan",
    endpoint: "plan",
    image: "plan",
  };
  let entities = [];
  if (plans.length === 0) {
    entities.push({
      title: "No Plans",
      attribute: "No plans available",
      id: null,
    });
    metadata.button = "Not available";
    metadata.endpoint = "plans";
  } else {
    plans.forEach((plan) => {
      entities.push({
        title: plan.name,
        attribute: formatter.formatDifficulty(plan.difficulty),
        id: plan.id,
      });
    });
  }
  res.render("explorer", { entities, metadata, categories });
};

renderController.new = async (req, res) => {
  const [latestPlan, latestWorkout, latestExercise] = await Promise.all([
    planController.getLatestPlan(),
    workoutController.getLatestWorkout(),
    exerciseController.getLatestExercise(),
  ]);
  let cardData = [
    {
      title: latestPlan.length ? latestPlan[0].name : "No Plan Available",
      description: latestPlan.length
        ? latestPlan[0].description
        : "No plan description",
      image: "plan",
      date_added: latestPlan.length
        ? latestPlan[0].date_added
        : "No Date Available",
    },
    {
      title: latestWorkout.length
        ? latestWorkout[0].name
        : "No Workout Available",
      description: latestWorkout.length
        ? latestWorkout[0].description
        : "No workout description",
      image: "workout",
      date_added: latestWorkout.length
        ? latestWorkout[0].date_added
        : "No Date Available",
    },
    {
      title: latestExercise.length
        ? latestExercise[0].name
        : "No Exercise Available",
      description: latestExercise.length
        ? latestExercise[0].description
        : "No exercise description",
      image: "exercise",
      date_added: latestExercise.length
        ? latestExercise[0].date_added
        : "No Date Available",
    },
  ];
  res.render("new", { cardData });
};

renderController.exercise = async (req, res) => {
  let id = req.params.exercise_id;
  const exercise = await exerciseController.getExerciseById(id);
  const category = await categoryController.getCategoryById(exercise.category);
  const extra = false;
  const entity = {
    name: exercise.name,
    description: exercise.description,
    difficulty: formatter.formatDifficulty(exercise.difficulty),
    duration: formatter.formatDuration(exercise.duration),
    category: category.name,
  };
  res.render("details", { entity, extra });
};

renderController.workout = async (req, res) => {
  let id = req.params.workout_id;
  const workout = await workoutController.getWorkoutById(id);
  const category = await categoryController.getCategoryById(workout.category);
  const extraEntities = await objectRetriever.getWorkoutExercises(
    workout.exercises
  );
  const extra = true;
  const metadata = {
    title: "Exercises",
    button: "View Exercise",
    endpoint: "exercise",
    image: "exercise",
    secondaryTitle: "Exercises",
  };
  const entity = {
    name: workout.name,
    description: workout.description,
    difficulty: formatter.formatDifficulty(workout.difficulty),
    duration: formatter.formatDuration(workout.duration),
    category: category.name,
  };
  res.render("details", { entity, extra, metadata, extraEntities });
};

renderController.plan = async (req, res) => {
  let id = req.params.plan_id;
  const plan = await planController.getPlanById(id);
  const category = await categoryController.getCategoryById(plan.category);
  const extraEntities = await objectRetriever.getPlanWorkouts(plan.workouts);
  const extra = true;
  const metadata = {
    title: "Workouts",
    button: "View Workout",
    endpoint: "workout",
    image: "workout",
    secondaryTitle: "Workouts",
  };
  const entity = {
    name: plan.name,
    description: plan.description,
    difficulty: formatter.formatDifficulty(plan.difficulty),
    duration: formatter.formatDuration(plan.duration),
    category: category.name,
  };
  res.render("details", { entity, extra, metadata, extraEntities });
};

renderController.contact = (req, res) => {
  res.render("contact");
};

export default renderController;
