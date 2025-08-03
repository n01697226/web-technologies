const express = require("express");
const router = express.Router();
const Recipe = require("./Recipe");

// all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// single recipe - find by id
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add new recipe
router.post("/", async (req, res) => {
  try {
    const newRecipe = await new Recipe(req.body);
    newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update recipe
router.put("/:id", async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Recipe not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete recipe
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Recipe not found" });
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
