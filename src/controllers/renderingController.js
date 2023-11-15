const renderController = {};

renderController.landingPage = (req, res) => {
  res.render("landing");
};

renderController.index = (req, res) => {
  res.render("index");
};

renderController.exercises = (req, res) => {
  res.render("exercises");
};

renderController.workouts = (req, res) => {
  res.render("workouts");
};

renderController.plans = (req, res) => {
  res.render("plans");
};

renderController.new = (req, res) => {
  res.render("new");
};

renderController.exercise = (req, res) => {
  res.render("exercise");
};

renderController.workout = (req, res) => {
  res.render("workout");
};

renderController.plan = (req, res) => {
  res.render("plan");
};

renderController.contact = (req, res) => {
  res.render("contact");
};

export default renderController;
