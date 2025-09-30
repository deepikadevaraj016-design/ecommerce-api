const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require('../controllers/cartController');

router.use(auth); 

router.post('/add', addToCart);
router.get('/', getCart);
router.put('/update/:cartId', updateCart);
router.delete('/remove/:cartId', removeFromCart);

module.exports = router;
