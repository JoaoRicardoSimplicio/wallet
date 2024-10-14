const Category = require('./models/category');


async function getOrCreateCategory(category){
  const [categoryInstance, created] = await Category.findOrCreate({
    where: { name: category },
    defaults: { name: category }
  });
  return categoryInstance
}


async function getCategory({ categoryName }){
  const category = await Category.findOne({ where: { name: categoryName }});
  return category;
}


module.exports = { getCategory, getOrCreateCategory };
