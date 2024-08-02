const Entry = require("../models/Entry");

const index = async (req, res) => {
  try {
    const posts = await Entry.showAll(req.user_id);
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(404).json({ sucess: false, error: err.message });
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const posts = await Entry.showOneById({
      post_id: id,
      user_id: req.user_id,
    });
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

const search = async (req, res) => {
  try {
    const search = req.query;

    const entries = Object.entries(search);

    const posts = await Entry.search({
      entries: entries,
      user_id: req.user_id,
    });

    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const newPost = await Entry.create(data);
    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const oldPost = await Entry.showOneById(id);
    const updatedPost = oldPost.update(data);
    res.status(200).json({ success: true, data: updatedPost });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await Entry.showOneById(id);
    const deletedPost = post.destroy(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { index, show, create, update, destroy, search };
