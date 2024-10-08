const express = require('express');
const router = express.Router();

const { createExpense, getExpenses, getExpensesSum } = require('./controller');
const getOrCreateCategory = require('../category/controller');


router.get('/', async (req, res) => {
  const { year, month, category } = req.query;

  try {
    const expenses = await getExpenses(year, month, category);
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const { description, value, date, category } = req.body;
    console.log(description, value, date, category)

    const categoryInstance = await getOrCreateCategory(category);
    const expense = await createExpense(
      description,
      value,
      date,
      categoryInstance.id
    );

    res.status(201).json(expense);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

router.get('/sum', async (req, res) => {
  const { year, month, category } = req.query;

  try {
    const totalExpenses = await getExpensesSum(year, month, category);
    res.status(200).json({ total: totalExpenses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message }); 
  }
})


module.exports = router;
