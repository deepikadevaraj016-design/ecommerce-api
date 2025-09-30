const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Category = require("../models/Category");

exports.create = async (req, res, next) => {
  try {
    const { name, sku, description, price, brandId, categoryIds } = req.body;
    const brand = await Brand.findByPk(brandId);
    if (!brand) return res.status(400).json({ msg: "Brand not found" });

    const product = await Product.create({ name, sku, description, price, brandId });

    if (categoryIds && categoryIds.length) {
      const categories = await Category.findAll({ where: { id: categoryIds } });
      await product.setCategories(categories);
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: [Brand, Category] });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: [Brand, Category] });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};
