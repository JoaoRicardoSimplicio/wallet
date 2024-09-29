const express = require('express');

const database = require('./src/config/database');
const categoryRoutes = require('./src/category/routes');
const expensesRoutes = require('./src/expenses/routes');
const mainRoutes = require('./src/main/routes');

const app = express();
const port = 3000;


database.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Error connection to database:', err));

app.use(express.json());

app.use('', mainRoutes);
app.use('/category', categoryRoutes);
app.use('/expenses', expensesRoutes);

app.listen(port, () => {
  console.log('Serving running on port', port);
});
