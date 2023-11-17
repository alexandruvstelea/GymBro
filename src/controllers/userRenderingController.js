import categoryController from "./categoryController.js";
import exerciseController from "./exerciseController.js";
import workoutController from "./workoutController.js";
import planController from "./planController.js";
import formatter from "./formatter.js";

const renderUser = {};

renderUser.landingPage = (req, res) => {
  res.render("landing");
};

renderUser.index = async (req, res) => {
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

renderUser.exercises = async (req, res) => {
  const exercises = await exerciseController.readAll();
  const categories = await categoryController.readByEntity("exercises");
  const metadata = {
    title: "Exercises",
    button: "View Exercise",
    endpoint: "exercise",
    image: "exercise",
    categoryEndpoint: "exercises",
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
    const formattedExercises = await Promise.all(
      exercises.map(async (exercise) => {
        const formattedDifficulty = await formatter.formatDifficulty(
          exercise.difficulty
        );
        return {
          title: exercise.name,
          attribute: formattedDifficulty,
          id: exercise.id,
        };
      })
    );
    entities = formattedExercises;
  }
  res.render("explorer", { entities, metadata, categories });
};

renderUser.exercisesByCategory = async (req, res) => {
  let id = req.params.categoryId;
  const exercises = await exerciseController.readByCategory(id);
  const categories = await categoryController.readByEntity("exercises");
  const metadata = {
    title: "Exercises",
    button: "View Exercise",
    endpoint: "exercise",
    image: "exercise",
    categoryEndpoint: "exercises",
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
    const formattedExercises = await Promise.all(
      exercises.map(async (exercise) => {
        const formattedDifficulty = await formatter.formatDifficulty(
          exercise.difficulty
        );
        return {
          title: exercise.name,
          attribute: formattedDifficulty,
          id: exercise.id,
        };
      })
    );
    entities = formattedExercises;
  }
  res.render("explorer", { entities, metadata, categories });
};

renderUser.workouts = async (req, res) => {
  const workouts = await workoutController.readAll();
  const categories = await categoryController.readByEntity("workouts");
  const metadata = {
    title: "Workouts",
    button: "View Workout",
    endpoint: "workout",
    image: "workout",
    categoryEndpoint: "workouts",
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
    const formattedWorkouts = await Promise.all(
      workouts.map(async (workout) => {
        const formattedDifficulty = await formatter.formatDifficulty(
          workout.difficulty
        );
        return {
          title: workout.name,
          attribute: formattedDifficulty,
          id: workout.id,
        };
      })
    );
    entities = formattedWorkouts;
  }
  res.render("explorer", { entities, metadata, categories });
};

renderUser.workoutsByCategory = async (req, res) => {
  let id = req.params.categoryId;
  const workouts = await workoutController.readByCategory(id);
  const categories = await categoryController.readByEntity("workouts");
  const metadata = {
    title: "Workouts",
    button: "View Workout",
    endpoint: "workout",
    image: "workout",
    categoryEndpoint: "workouts",
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
    const formattedWorkouts = await Promise.all(
      workouts.map(async (workout) => {
        const formattedDifficulty = await formatter.formatDifficulty(
          workout.difficulty
        );
        return {
          title: workout.name,
          attribute: formattedDifficulty,
          id: workout.id,
        };
      })
    );
    entities = formattedWorkouts;
  }
  res.render("explorer", { entities, metadata, categories });
};

renderUser.plans = async (req, res) => {
  const plans = await planController.readAll();
  const categories = await categoryController.readByEntity("plans");
  const metadata = {
    title: "Plans",
    button: "View Plan",
    endpoint: "plan",
    image: "plan",
    categoryEndpoint: "plans",
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
    const formattedPlans = await Promise.all(
      plans.map(async (plan) => {
        const formattedDifficulty = await formatter.formatDifficulty(
          plan.difficulty
        );
        return {
          title: plan.name,
          attribute: formattedDifficulty,
          id: plan.id,
        };
      })
    );
    entities = formattedPlans;
  }
  res.render("explorer", { entities, metadata, categories });
};

renderUser.plansByCategory = async (req, res) => {
  let id = req.params.categoryId;
  const plans = await planController.readByCategory(id);
  const categories = await categoryController.readByEntity("plans");
  const metadata = {
    title: "Plans",
    button: "View Plan",
    endpoint: "plan",
    image: "plan",
    categoryEndpoint: "plans",
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
    const formattedPlans = await Promise.all(
      plans.map(async (plan) => {
        const formattedDifficulty = await formatter.formatDifficulty(
          plan.difficulty
        );
        return {
          title: plan.name,
          attribute: formattedDifficulty,
          id: plan.id,
        };
      })
    );
    entities = formattedPlans;
  }
  res.render("explorer", { entities, metadata, categories });
};

renderUser.new = async (req, res) => {
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
        ? await formatter.formatDate(latestPlan[0].date_added)
        : "No Date Available",
      entityId: latestPlan.length ? latestPlan[0].id : "/",
      entityType: "plan",
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
        ? await formatter.formatDate(latestWorkout[0].date_added)
        : "No Date Available",
      entityId: latestWorkout.length ? latestWorkout[0].id : "/",
      entityType: "workout",
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
        ? await formatter.formatDate(latestExercise[0].date_added)
        : "No Date Available",
      entityId: latestExercise.length ? latestExercise[0].id : "/",
      entityType: "exercise",
    },
  ];
  res.render("new", { cardData });
};

renderUser.exercise = async (req, res) => {
  let id = req.params.exerciseId;
  const exercise = await exerciseController.readById(id);
  const category = await categoryController.readById(exercise.category);
  const extra = false;
  const entity = {
    name: exercise.name,
    description: exercise.description,
    difficulty: await formatter.formatDifficulty(exercise.difficulty),
    duration: await formatter.formatDuration(exercise.duration),
    category: category.name,
  };
  res.render("details", { entity, extra });
};

renderUser.workout = async (req, res) => {
  let id = req.params.workoutId;
  const workout = await workoutController.readById(id);
  const category = await categoryController.readById(workout.category);
  const extraEntities = await workoutController.getWorkoutExercises(
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
    difficulty: await formatter.formatDifficulty(workout.difficulty),
    duration: await formatter.formatDuration(workout.duration),
    category: category.name,
  };
  res.render("details", { entity, extra, metadata, extraEntities });
};

renderUser.plan = async (req, res) => {
  let id = req.params.planId;
  const plan = await planController.readById(id);
  const category = await categoryController.readById(plan.category);
  const extraEntities = await planController.getPlanWorkouts(plan.workouts);
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
    difficulty: await formatter.formatDifficulty(plan.difficulty),
    duration: await formatter.formatDuration(plan.duration),
    category: category.name,
  };
  res.render("details", { entity, extra, metadata, extraEntities });
};

renderUser.contact = (req, res) => {
  res.render("contact");
};

renderUser.admin = (req, res) => {
  res.render("adminIndex");
};

renderUser.wip = (req, res) => {
  res.render("wip");
};
export default renderUser;
