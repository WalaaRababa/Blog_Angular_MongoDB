const express=require("express");
const UserRouter = require("./routes/user");
const articleRouter = require("./routes/article");
const PORT=5000||process.env.PORT;
const app=express()
require('dotenv').config()
app.use(express.json())

require('./models/db')


app.use('/user',UserRouter)
app.use('/article',articleRouter)

app.listen(PORT,()=>
{
    console.log(`App listening on ${PORT}`);
})