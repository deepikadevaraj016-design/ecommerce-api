const router = require("express").Router();
const { getByOrder } = require("../controllers/orderItemController");
const auth = require("../middleware/auth");

router.get("/:orderId", auth, getByOrder);

module.exports = router;
