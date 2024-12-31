const express=require('express');
const app=express();
const connectDB=require('./Config/db');
const userRoute=require('./Router/user');
const adminRoute=require('./Router/admin');
const cors = require('cors');


connectDB();

const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOption));


app.get('/',(req,res)=>{
    console.log("server created");
    res.status(200).send("server created");
    
})

app.use('/api/user',userRoute);
app.use('/api/admin',adminRoute);



app.listen(3000,()=>{
    console.log("server is listening at port 3000");
})
