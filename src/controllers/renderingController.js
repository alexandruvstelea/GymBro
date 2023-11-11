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

export default renderController;
