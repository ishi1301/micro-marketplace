const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const User = require("../models/user");

// ADD TO FAVORITES
router.post("/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.favorites.includes(req.params.productId)) {
      user.favorites.push(req.params.productId);
      await user.save();
    }

    res.json({ message: "Added to favorites" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REMOVE FROM FAVORITES
router.delete("/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.params.productId
    );

    await user.save();

    res.json({ message: "Removed from favorites" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER FAVORITES
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;