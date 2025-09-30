const router = require("express").Router();
const { register, login, getUsers, profile, updateAddress } = require("../controllers/userController");
const auth = require("../middleware/auth"); 

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, getUsers); 
router.get("/profile", auth, profile);
router.put("/address", auth, updateAddress); 

module.exports = router;
