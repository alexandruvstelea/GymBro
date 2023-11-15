import counter from "../helper_functions/documentCounting.js";
import objectRetriever from "../helper_functions/retrieveObjects.js";
import categoryRetriever from "../helper_functions/retrieveCategories.js";
import formatter from "../helper_functions/propetyFormating.js";

const renderController = {};

renderController.landingPage = (req, res) => {
  res.render("landing");
};

renderController.index = async (req, res) => {
  const exercisesCount = await counter.countExercises();
  const workoutCount = await counter.countWorkouts();
  const planCount = await counter.countPlans();

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
  const exercises = await objectRetriever.getAllExercises();
  const categories = await categoryRetriever.getEntityCategories("exercises");
  const metadata = {
    title: "Exercises",
    button: "View Exercise",
    endpoint: "exercise",
    image: "exercise",
  };
  let entities = [];

  exercises.forEach((exercise) => {
    let string_difficulty = "";
    if (exercise.difficulty == 1) {
      string_difficulty = "Easy";
    } else if (exercise.difficulty == 2) {
      string_difficulty = "Medium";
    } else {
      string_difficulty = "Hard";
    }
    entities.push({
      title: exercise.name,
      attribute: string_difficulty,
      id: exercise.id,
    });
  });

  res.render("explorer", { entities, metadata, categories });
};

renderController.workouts = async (req, res) => {
  const workouts = await objectRetriever.getAllWorkouts();
  const categories = await categoryRetriever.getEntityCategories("workouts");
  const metadata = {
    title: "Workouts",
    button: "View Workout",
    endpoint: "workout",
    image: "workout",
  };
  let entities = [];

  workouts.forEach((workout) => {
    let string_difficulty = "";
    if (workout.difficulty == 1) {
      string_difficulty = "Easy";
    } else if (workout.difficulty == 2) {
      string_difficulty = "Medium";
    } else {
      string_difficulty = "Hard";
    }
    entities.push({
      title: workout.name,
      attribute: string_difficulty,
      id: workout.id,
    });
  });

  res.render("explorer", { entities, metadata, categories });
};

renderController.plans = async (req, res) => {
  const plans = await objectRetriever.getAllPlans();
  const categories = await categoryRetriever.getEntityCategories("plans");
  const metadata = {
    title: "Plans",
    button: "View Plan",
    endpoint: "plan",
    image: "plan",
  };
  let entities = [];

  plans.forEach((plan) => {
    let string_difficulty = "";
    if (plan.difficulty == 1) {
      string_difficulty = "Easy";
    } else if (plan.difficulty == 2) {
      string_difficulty = "Medium";
    } else {
      string_difficulty = "Hard";
    }
    entities.push({
      title: plan.name,
      attribute: string_difficulty,
      id: plan.id,
    });
  });

  res.render("explorer", { entities, metadata, categories });
};

renderController.new = async (req, res) => {
  const [latestPlan, latestWorkout, latestExercise] = await Promise.all([
    objectRetriever.getLatestPlan(),
    objectRetriever.getLatestWorkout(),
    objectRetriever.getLatestExercise(),
  ]);

  let cardData = [
    {
      title: latestPlan[0].name,
      description: latestPlan[0].description,
      image: "plan",
    },
    {
      title: latestWorkout[0].name,
      description: latestWorkout[0].description,
      image: "workout",
    },
    {
      title: latestExercise[0].name,
      description: latestExercise[0].description,
      image: "exercise",
    },
  ];

  res.render("new", { cardData });
};

renderController.exercise = async (req, res) => {
  let id = req.params.exercise_id;
  const exercise = await objectRetriever.getExerciseById(id);
  let string_difficulty = "";
  if (exercise.difficulty == 1) {
    string_difficulty = "Easy";
  } else if (exercise.difficulty == 2) {
    string_difficulty = "Medium";
  } else {
    string_difficulty = "Hard";
  }

  const category = await categoryRetriever.getCategoryById(exercise.category);

  const minutes = Math.floor(exercise.duration / 60);
  const remainingSeconds = exercise.duration % 60;
  const formattedTime = `${minutes}min ${remainingSeconds}s`;

  const extra = false;

  const entity = {
    name: exercise.name,
    description: exercise.description,
    difficulty: string_difficulty,
    duration: formattedTime,
    category: category.name,
  };
  res.render("details", { entity, extra });
};

renderController.workout = async (req, res) => {
  let id = req.params.workout_id;
  const workout = await objectRetriever.getWorkoutById(id);
  const category = await categoryRetriever.getCategoryById(workout.category);
  const formattedTime = await formatter.formatDuration(workout.duration);
  const string_difficulty = await formatter.formatDifficulty(
    workout.difficulty
  );
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
    difficulty: string_difficulty,
    duration: formattedTime,
    category: category.name,
  };

  res.render("details", { entity, extra, metadata, extraEntities });
};

renderController.plan = async (req, res) => {
  let id = req.params.plan_id;
  const plan = await objectRetriever.getPlanById(id);
  const category = await categoryRetriever.getCategoryById(plan.category);
  const formattedTime = await formatter.formatDuration(plan.duration);
  const string_difficulty = await formatter.formatDifficulty(plan.difficulty);
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
    difficulty: string_difficulty,
    duration: formattedTime,
    category: category.name,
  };

  res.render("details", { entity, extra, metadata, extraEntities });
};

renderController.contact = (req, res) => {
  res.render("contact");
};

export default renderController;
