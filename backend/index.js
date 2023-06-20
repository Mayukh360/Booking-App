const Express = require('express');
const sequelize = require('./database/database');
const Product = require('./models/product');
const cors = require('cors');

const app = Express();
app.use(cors());
app.use(Express.json());

app.get('/getData', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/getData', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const product = await Product.create({ name, email, phone });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/getData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    product.name = name;
    product.email = email;
    product.phone = phone;
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/getData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
      console.log('Server running');
    });
  })
  .catch((err) => {
    console.log(err);
  });
