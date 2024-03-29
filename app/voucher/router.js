var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  updateStatus,
} = require("./controller");

const multer = require("multer");
const os = require("os");
const { isLoginAdmin } = require("../middleware/auth");

router.use(isLoginAdmin);

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post(
  "/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionCreate
);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
router.delete("/delete/:id", actionDelete);
router.put("/update/:id", updateStatus);

module.exports = router;
