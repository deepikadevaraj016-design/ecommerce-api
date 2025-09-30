const router = require("express").Router();
const { create, getAll, getById } = require("../controllers/brandController");
const auth = require("../middleware/auth");

router.post("/", auth, create);
router.get("/", getAll);
router.get("/:id", getById);

module.exports = router;
