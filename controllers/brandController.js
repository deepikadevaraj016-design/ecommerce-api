const Brand = require("../models/Brand");

exports.create = async (req, res, next) => {
  try {
    const brand = await Brand.create({ name: req.body.name, createdBy: req.customer.id });
    res.json(brand);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const brands = await Brand.findAll();
    res.json(brands);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ msg: "Brand not found" });
    res.json(brand);
  } catch (err) {
    next(err);
  }
};
