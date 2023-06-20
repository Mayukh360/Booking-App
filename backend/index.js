const Express=require('express');
const sequelize=require('./database/database');
const product= require('./models/product')
const cors=require('cors');
const bodyParser = require('body-parser');





const app=Express();
// Add this line below your other imports

app.use(cors());
app.use(bodyParser.json());

app.post('/getData', (req, res) => {
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
  

// app.listen(3000,()=>{
//     console.log("Server Running")
// })

product.sync()
.then((res)=>{
    console.log(res);
    app.listen(3000);
     })
     .catch((err)=>{
        console.log(err)
     })

