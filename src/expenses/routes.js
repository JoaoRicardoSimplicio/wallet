const express = require('express');
const router = express.Router();

const { createExpense, getExpenses, getExpensesSum } = require('./controllers/expense');
const createExpenseBudget = require('./controllers/expenseBudget');
const { getCategory } = require('../category/controller');


router.get('/', async (req, res) => {
  const { year, month, category } = req.query;

  try {
    const expenses = await getExpenses(year, month, category);

    const serializedExpenses = expenses.map(expense => ({
      description: expense.description,
      value: expense.value,
      date: expense.date,
      category: expense.category.name
    }));

    res.status(200).json(serializedExpenses);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const { description, value, date, category } = req.body;
    console.log(description, value, date, category)

    const categoryInstance = await getCategory({ 'categoryName': category });
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

router.post('/budget', async(req, res) => {
  const { value, category, budgetBy } = req.body;

  try {
    const categoryInstance = await getCategory({ 'categoryName': category });
    const expenseBudget = await createExpenseBudget(value, categoryInstance, budgetBy);
    res.status(201).json(expenseBudget)
  } catch (error) {
    console.log(error);
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
});


module.exports = router;
