const {Router} = require("express");
const { isLoggedIn } = require("../middlewares/auth-middleware");
const categoryController = require("../controllers/category-controller");

const router = Router();

router.route("/")
    .get(isLoggedIn, categoryController.getAllCategory);

module.exports = router;