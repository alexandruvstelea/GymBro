const renderController = {};

renderController.landingPage = (req, res) => {
  res.render("landing");
};

renderController.index = (req, res) => {
  res.render("index");
};

export default renderController;
