const formatter = {};

formatter.formatDifficulty = async (difficulty) => {
  let formatted_difficulty = "";
  if (difficulty == 1) {
    formatted_difficulty = "Easy";
  } else if (difficulty == 2) {
    formatted_difficulty = "Medium";
  } else {
    formatted_difficulty = "Hard";
  }
  return formatted_difficulty;
};

formatter.formatDuration = async (duration) => {
  const minutes = Math.floor(duration / 60);
  const remainingSeconds = duration % 60;
  const formatted_duration = `${minutes}min ${remainingSeconds}s`;
  return formatted_duration;
};

export default formatter;
