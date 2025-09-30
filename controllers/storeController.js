const Store = require("../models/Store");

exports.create = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    res.json(store);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ msg: "Store not found" });
    res.json(store);
  } catch (err) {
    next(err);
  }
};
