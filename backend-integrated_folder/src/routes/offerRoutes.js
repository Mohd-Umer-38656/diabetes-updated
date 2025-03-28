const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");

// Route to get all offers
router.get("/", offerController.getOffers);

// Route to add a new offer
router.post("/", offerController.addOffer);

// Route to update an existing offer by ID
router.put("/:id", offerController.updateOffer);

// Route to delete an offer by ID
router.delete("/:id", offerController.deleteOffer);

module.exports = router;
