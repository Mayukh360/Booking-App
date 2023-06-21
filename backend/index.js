const Express = require('express');
const sequelize = require('./database/database');
const bookingController = require('./controller/bookingcontroller');
const cors = require('cors');
const Product=require('./models/product');
const User=require('./models/user');

const app = Express();
app.use(cors());
app.use(Express.json());

app.use((req,res,next)=>{
  User.findByPk(1)
  .then(user=>{
    req.user=user;
    next()
  })
  .catch(err=>console.log(err))
})

app.get('/getData', bookingController.getAllProducts);
app.post('/getData', bookingController.createProduct);
app.put('/getData/:id', bookingController.updateProduct);
app.delete('/getData/:id', bookingController.deleteProduct);

User.hasMany(Product);
Product.belongsTo(User)

sequelize
  .sync()
  .then((result) => {
    console.log('Database synced');
        return User.findByPk(1);
  })
  .then((user)=>{
    if(!user){
      return User.create({name:'Mayukh',email:'mkc360@gmail.com'})
    }
    return user;
  })
  .then(user=>{
    // console.log(user);
    app.listen(3000, () => {
      console.log('Server running');
    });
  })
  .catch((err) => {
    console.log(err);
  });
