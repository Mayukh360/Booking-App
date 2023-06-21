const Express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('./database/database');
const bookingController = require('./controller/bookingcontroller');
const cors = require('cors');
const Product=require('./models/product');
const User=require('./models/user');

const app = Express();
app.use(cors());
app.use(Express.json());

app.use((req,res,next)=>{
  User.findByPk(2)
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

//***For SignUp */

// *** For SignUp ***
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists in the database
  User.findOne({ where: { email } })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash the password
      bcrypt.hash(password, 10)
        .then((hashedPassword) => {
          // Create a new user with the hashed password
          User.create({ name, email, password: hashedPassword })
            .then((newUser) => {
              // Generate a JWT token for the new user
              const token = jwt.sign(
                { userId: newUser.id, name: newUser.name },
                'your-secret-key',
                { expiresIn: '1h' }
              );

              res.json({ token });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ error: 'Failed to create user' });
            });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

//*** Login ***
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find the user in the database (using your Sequelize model)
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email' });
      }

      // Compare the provided password with the hashed password
      bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            return res.status(401).json({ error: 'Invalid password' });
          }

          // Generate a JWT token
          const token = jwt.sign(
            { userId: user.id, name: user.name },
            'your-secret-key',
            {
              expiresIn: '1h', // Token expiration time
            }
          );

          // Return the token in the response
          res.json({ token });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
User.hasMany(Product);
Product.belongsTo(User)

sequelize
  .sync()
  .then((result) => {
    console.log('Database synced');
        return User.findByPk(1);
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
