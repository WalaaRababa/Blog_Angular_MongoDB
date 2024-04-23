const express=require("express");
const UserRouter = require("./routes/user");
const PORT=5000||process.env.PORT;
const app=express()
require('dotenv').config()
require('./models/db')



app.use('/use',UserRouter)

app.listen(PORT,()=>
{
    console.log(`App listening on ${PORT}`);
})