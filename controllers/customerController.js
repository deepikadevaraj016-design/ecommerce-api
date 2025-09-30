const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, latitude, longitude } = req.body;
    let customer = await Customer.findOne({ where: { email } });
    if (customer) return res.status(400).json({ msg: "Customer already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      latitude,
      longitude,
    });

    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  console.log("req.body:", req.body);
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    if (!customer) return res.status(404).json({ msg: "Customer not found" });

    const match = await bcrypt.compare(password, customer.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: customer.id, role: "customer" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.customer.id);
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const customer = await Customer.findByPk(req.customer.id);
    customer.latitude = latitude;
    customer.longitude = longitude;
    await customer.save();
    res.json(customer);
  } catch (err) {
    next(err);
  }
};
