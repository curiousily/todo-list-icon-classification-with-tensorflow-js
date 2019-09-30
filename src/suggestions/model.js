import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as use from "@tensorflow-models/universal-sentence-encoder";
const learnTodos = require("./data/learn_todos.json");
const exerciseTodos = require("./data/exercise_todos.json");

const trainTasks = learnTodos.concat(exerciseTodos);

const N_CLASSES = 2;

const encodeData = async (encoder, tasks) => {
  const sentences = tasks.map(t => t.text.toLowerCase());
  const embeddings = await encoder.embed(sentences);
  return embeddings;
};

const train = async () => {
  const yTrain = tf.tensor2d(
    trainTasks.map(t => [t.icon === "BOOK" ? 1 : 0, t.icon === "RUN" ? 1 : 0])
  );

  const encoder = await use.load();

  const xTrain = await encodeData(encoder, trainTasks);

  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      inputShape: [xTrain.shape[1]],
      activation: "softmax",
      units: N_CLASSES
    })
  );

  model.compile({
    loss: "categoricalCrossentropy",
    optimizer: tf.train.adam(0.01),
    metrics: ["accuracy"]
  });

  const lossContainer = document.getElementById("loss-cont");

  await model.fit(xTrain, yTrain, {
    batchSize: 32,
    validationSplit: 0.1,
    shuffle: true,
    epochs: 150,
    callbacks: tfvis.show.fitCallbacks(
      lossContainer,
      ["loss", "val_loss", "acc", "val_acc"],
      {
        callbacks: ["onEpochEnd"]
      }
    )
  });
};

export { train };
