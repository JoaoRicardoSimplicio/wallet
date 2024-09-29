const express = require('express');
const { Op, col, fn } = require('sequelize');
const router = express.Router();

const Expense = require('./models/expense');
const Category = require('../category/models/category');


router.get('/', async (req, res) => {
  const { year, month } = req.query;

  try {

    let whereClause = {};

    if (year, month) {
      const parsedYear = parseInt(year);
      const parsedMonth = parseInt(month);

      if (isNaN(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12){
        return res.status(400).json({ error: 'Invalid month or year' });
      }

      whereClause.date = {
        [Op.gte]: new Date(parsedYear, parsedMonth - 1, 1),
        [Op.lt]: new Date(parsedYear, parsedMonth, 1)
      };
    }

    const expenses = await Expense.findAll({ where: whereClause });
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

    const [categoryInstance, created] = await Category.findOrCreate({
      where: { name: category },
      defaults: { name: category }
    });

    const expense = await Expense.create({
      description: description,
      value: value,
      date: date,
      categoryId: categoryInstance.id 
    });

    res.status(201).json(expense);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

router.get('/sum', async (req, res) => {
  const { year, month, category } = req.query;

  try {
    let categoryIds;
    let parsedYear;
    let parsedMonth;
    if (month, year) {
      parsedMonth = parseInt(month);
      year = parseInt(year);

      if (isNan(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12){
        return res.status(400).json({ error: 'Invalid year or month...' });
      }
    }
    
    if (category) {
      categoryIds = await Category.findAll({
        attributes: ['id'],
        where: {
          name: category
        },
      }).then(
        categories => categories.map(category => category.id)
      );
    }

    const whereClause = {
      ...(parsedYear && parsedMonth && {
        date: {
          [Op.gte]: new Date(parsedYear, parsedMonth -1, 1),
          [Op.lt]: new Date(parsedYear, parsedMonth, 1)
        },
      }),
      ...(categoryIds && {
        categoryId: {
          [Op.in]: categoryIds
        },
      })
    };
    const totalValue = await Expense.sum('value', {
      where: whereClause
    });

    res.status(200).json(totalValue);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message }); 
  }

})

module.exports = router;
