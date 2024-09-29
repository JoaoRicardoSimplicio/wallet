const express = require('express');
const router = express.Router();

const Category = require('./models/category');


router.get('/', async (req, res) => {
  try {
    const catories = await Category.findAll();
    res.json(catories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});


router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});


module.exports = router;
