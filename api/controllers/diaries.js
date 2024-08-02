const Diary = require("../models/Diary");

const index = async (req, res) => {
  try {
    const posts = await Diary.showAll();
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(404).json({ sucess: false, error: err.message });
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const posts = await Diary.showOneById(id);
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const newPost = await Diary.create(data);
    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    res.status(400).json({ success: true, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const oldPost = await Diary.showOneById(id);
    const updatedPost = oldPost.update(data);
    res.status(200).json({ success: true, data: updatedPost });
  } catch (err) {
    res.status(400).json({ success: true, error: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await Diary.showOneById(id);
    const deletedPost = post.update(data);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ success: true, error: err.message });
  }
};

module.exports = { index, show, create, update, destroy };
