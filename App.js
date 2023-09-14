
import express from "express"
import mongoose from "mongoose";

const app =  express()
const PORT = 3000;

app.use(express.json());


// CRUD operstions using mongodb

// read
app.get('/api/users', async(req,res)=>{
    let result = await mongoose.connection.collection('user').find().toArray();
    res.json(result);
})


// create
app.post('/api/users',(req,res) =>{
    const {email,password} = req.body;
    mongoose.connection.collection('user').insertOne({email,password})
    console.log('created');
    res.json('created');
})


// update
app.put('/api/users/:id',(req,res)=>{
    console.log(req.params.id);
    console.log(req.body);
    const { id } = req.params;
    let update_id = new mongoose.Types.ObjectId(id);
    mongoose.connection.collection('user').updateOne({_id:update_id},{
        $set:{
            email:req.body.email,
            password:req.body.password
        }
    })
    res.json('api has been updated');
})


// delete
app.delete('/api/users/:id', (req,res)=>{
    console.log(req.params.id);
    let delete_id = new mongoose.Types.ObjectId(req.params.id);
    mongoose.connection.collection('user').deleteOne({_id:delete_id});
    console.log('deleted');
   res.json("deleted");
})

const connect_mongodb = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/user').then(() =>{
        console.log('mongodb has connected');
    }).catch((err)=>console.log(err.message))  
}

app.listen(PORT ,(req,res)=>{
    connect_mongodb();
    console.log("server running", {PORT});
})