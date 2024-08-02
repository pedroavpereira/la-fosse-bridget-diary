const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.status(200).json({
    name: "Bridget Jones Diary",
    description:
      "Do you love the sound of your own voice? Do you feel that you have something to share that you don't want anyone else to see?",
  });
});

module.exports = app;
