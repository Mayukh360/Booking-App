const Express = require('express');
const sequelize = require('./database/database');
const bookingController = require('./controller/bookingcontroller');
const cors = require('cors');

const app = Express();
app.use(cors());
app.use(Express.json());

app.get('/getData', bookingController.getAllProducts);
app.post('/getData', bookingController.createProduct);
app.put('/getData/:id', bookingController.updateProduct);
app.delete('/getData/:id', bookingController.deleteProduct);

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
