const { Op, col, fn } = require('sequelize');

const Expense = require('./models/expense');
const Category = require('../category/models/category');


class InvalidData extends Error {
  constructor(message){
    super(message);
    this.name = this.constructor.name;
  }
}

async function getExpenses(year, month, category){
  let categoryIds;
  let parsedMonth;
  let parsedYear;

  if (year, month){
    parsedYear = parseInt(year);
    parsedMonth = parseInt(month);

    if (isNaN(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12){
      throw new InvalidData('Invalid month or year');
    }
  }

  if (category){
    categoryIds = await Category.findAll({
      attributes: ['id'],
      where: {
        name: category
      }
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
      }
    })
  }

  const expenses = await Expense.findAll({
    where: whereClause,
    include: [{
      model: Category,
      as: 'category',
      attributes: ['name']
    }]
  });

  return expenses;
}


async function getExpensesSum(year, month, category){
  const expenses = await getExpenses(year, month, category);
  const totalValue = expenses.reduce((total, expense) => {
    return total += expense.value || 0;
  }, 0);

  return totalValue;
}


async function createExpense(
  description,
  value,
  date,
  categoryId
){
  const expense = await Expense.create({
    description: description,
    value: value,
    date: date,
    categoryId: categoryId
  });

  return expense;
}


module.exports = { createExpense, getExpenses, getExpensesSum };
