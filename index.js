const express=require("express");
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const userRoutes=require('./routes/userRoutes');
const bookRoutes=require('./routes/books');
const bodyParser=require('body-parser');


const app=express()
const PORT=process.env.PORT || 2000;

dotEnv.config();
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("mongoDB connected successfully"))
    .catch((error)=>console.log(error))

app.use(bodyParser.json())
app.use('/user',userRoutes);
app.use(express.json());
app.use('/api/books', bookRoutes);


app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`)
})

app.use('/',(req,res)=>{
    res.send("<h1> welcome to Home Page");
})
