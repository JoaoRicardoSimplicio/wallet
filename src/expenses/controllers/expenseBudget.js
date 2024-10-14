const expenseBudget = require("../models/expenseBudget");


async function createExpenseBudget(value, categoryInstance, budgetBy){
  const expenseBudgetInstance = await expenseBudget.create({
    value: value,
    budgetBy: budgetBy,
    categoryId: categoryInstance.id
  });
  return expenseBudgetInstance;
}


module.exports = createExpenseBudget;
