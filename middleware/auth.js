const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

const authCustomer = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findByPk(decoded.id);
    if (!customer) return res.status(401).json({ msg: "Customer not found" });

    req.customer = customer;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authCustomer;
