const OrderItem = require("../models/OrderItem");

exports.getByOrder = async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({ where: { orderId: req.params.orderId } });
    res.json(items);
  } catch (err) {
    next(err);
  }
};
