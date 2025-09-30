const router = require("express").Router();
const { createOrder, getOrders } = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/", auth, createOrder);

router.get("/", auth, getOrders);

module.exports = router;
