const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const customerId = req.customer.id; 

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    let cartItem = await Cart.findOne({ where: { customerId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.priceSnapshot = product.price; 
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        customerId,
        productId,
        quantity,
        priceSnapshot: product.price,
      });
    }

    res.json(cartItem);
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const customerId = req.customer.id;
    const cartItems = await Cart.findAll({
      where: { customerId },
      include: [{ model: Product }],
    });
    res.json(cartItems);
  } catch (err) {
    next(err);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { cartId } = req.params;   
    const customerId = req.customer.id;

    const cartItem = await Cart.findOne({ where: { id: cartId, customerId } });
    if (!cartItem) return res.status(404).json({ msg: 'Cart item not found' });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const customerId = req.customer.id;

    const deleted = await Cart.destroy({ where: { id: cartId, customerId } });
    if (!deleted) return res.status(404).json({ msg: 'Cart item not found' });

    res.json({ msg: 'Item removed from cart' });
  } catch (err) {
    next(err);
  }
};
