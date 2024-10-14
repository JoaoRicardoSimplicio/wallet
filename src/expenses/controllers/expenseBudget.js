const expenseBudget = require("../models/expenseBudget");
const { getCategory } = require('../../category/controller');


async function createExpenseBudget(value, category, budgetBy){
  const categoryInstance = await getCategory({ 'categoryName': category });
  const expenseBudgetInstance = await expenseBudget.create({
    value: value,
    budgetBy: budgetBy,
    categoryId: categoryInstance.id
  });
  return expenseBudgetInstance;
}


module.exports = createExpenseBudget;
