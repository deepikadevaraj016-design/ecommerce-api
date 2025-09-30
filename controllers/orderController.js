const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createOrder = async (req, res, next) => {
  try {
    const customerId = req.customer.id;

    const cartItems = await Cart.findAll({ where: { customerId }, include: Product });
    if (!cartItems.length) return res.status(400).json({ msg: 'Cart is empty' });

    const total = cartItems.reduce(
      (sum, item) => sum + item.priceSnapshot * item.quantity,
      0
    );

    const order = await Order.create({
      customerId,
      total,
      status: 'CREATED',
    });

    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceSnapshot: item.priceSnapshot,
      });
    }

    await Cart.destroy({ where: { customerId } });

    res.json({ msg: 'Order created successfully', order });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const customerId = req.customer.id;
    const orders = await Order.findAll({
      where: { customerId },
      include: [
        {
          model: OrderItem,
          include: [Product], 
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
