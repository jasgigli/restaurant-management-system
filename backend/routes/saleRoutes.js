const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { createSaleSchema } = require("../validators/saleValidator");

router.post(
  "/",
  protect,
  authorize("SuperAdmin", "Sales"),
  validate(createSaleSchema),
  saleController.createSale
);
router.get(
  "/",
  protect,
  authorize("SuperAdmin", "Moderator"),
  saleController.getSalesReport // supports ?page=1&limit=10
);

module.exports = router;
