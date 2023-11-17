import mongoose from "mongoose";
import faker from "faker";
import Category from "./src/models/Category.js";
import Exercise from "./src/models/Exercise.js";
import Plan from "./src/models/Plan.js";
import Workout from "./src/models/Workout.js";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createFakeData() {
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const category = new Category({
      name: faker.commerce.department(),
      category_for: ["exercises", "workouts"],
    });
    categories.push(await category.save());
  }

  const exercises = [];
  for (let i = 0; i < 50; i++) {
    const exercise = new Exercise({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      difficulty: faker.random.number({ min: 1, max: 5 }),
      duration: faker.random.number({ min: 5, max: 60 }),
      category: faker.random.arrayElement(categories)._id,
    });
    exercises.push(await exercise.save());
  }

  const workouts = [];
  for (let i = 0; i < 20; i++) {
    const workout = new Workout({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      duration: faker.random.number({ min: 15, max: 120 }),
      difficulty: faker.random.number({ min: 1, max: 5 }),
      category: faker.random.arrayElement(categories)._id,
      exercises: faker.random.arrayElements(
        exercises.map((ex) => ex._id),
        5
      ),
    });
    workouts.push(await workout.save());
  }

  for (let i = 0; i < 10; i++) {
    const plan = new Plan({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      duration: faker.random.number({ min: 1, max: 12 }),
      difficulty: faker.random.number({ min: 1, max: 5 }),
      category: faker.random.arrayElement(categories)._id,
      workouts: faker.random.arrayElements(
        workouts.map((w) => w._id),
        3
      ),
    });
    await plan.save();
  }

  console.log("Fake data generated successfully!");
}

createFakeData().then(() => {
  mongoose.disconnect();
});
