const express = require("express");
const router = express.Router();
const Recipe = require("Recipe.js");

// all recipes
router.get("/", (req, res) => {
  try {
    const recipes = Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// single recipe - find by id
router.get("/:id", (req, res) => {
  try {
    const recipe = Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add new recipe
router.post("/", (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update recipe
router.put("/:id", (req, res) => {
  try {
    const updated = Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Recipe not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete recipe
router.delete("/:id", (req, res) => {
  try {
    const deleted = Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Recipe not found" });
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
