const router = require("express").Router();
const { register, login, profile, updateAddress } = require("../controllers/customerController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, profile);
router.put("/address", auth, updateAddress);

module.exports = router;
