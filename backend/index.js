const Express=require('express');
const sequelize=require('./database/database');
const product= require('./models/product')
const cors=require('cors');
const bodyParser = require('body-parser');

const app=Express();
// Add this line below your other imports

app.use(cors());
app.use(bodyParser.json());

app.post('/getData', (req, res) => {      //FOR POSTING
    const { name, email, phone } = req.body;
   // Create a new product record in the MySQL table
    product.create({ name, email, phone })
      .then((createdProduct) => {
        console.log(createdProduct);
        res.status(200).json(createdProduct); // Optionally, send the created product back as a response
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  

  app.get('/getData', (req, res) => {        //FOR FETCHING
    // Fetch the data from the MySQL table
    product.findAll()
      .then((data) => {
        res.status(200).json(data); // Send the fetched data as a response
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  app.delete('/getData/:id', (req, res) => {   //FOR DELETING
    const { id } = req.params;
  
    // Delete the record from the MySQL table
    product.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: 'Item deleted successfully' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  
  

product.sync()
.then((res)=>{
    console.log(res);
    app.listen(3000);
     })
     .catch((err)=>{
        console.log(err)
     })

