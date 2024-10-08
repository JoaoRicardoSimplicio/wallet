const Category = require('./models/category');


async function getOrCreateCategory(category){
  const [categoryInstance, created] = await Category.findOrCreate({
    where: { name: category },
    defaults: { name: category }
  });
  return categoryInstance
}


module.exports = getOrCreateCategory;
