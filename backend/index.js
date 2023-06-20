const Express=require('express');
const sequelize=require('./database/database');
const product= require('./models/product')
const cors=require('cors');

const app=Express();
app.use(cors());

app.use('/getData',(req,res)=>{
    res.send("This is from Backend")
    // console.log(req)
})

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

