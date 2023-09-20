
import express from "express"
import mongoose from "mongoose";

const app =  express()
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// CRUD operstions using mongodb

app.get('/api/users', async (req, res) => {
    const queryId = parseInt(req.query.id);
    const queryEmail = req.query.email;

    // Construct the filter object based on query parameters
    const filter = {};

    if (!isNaN(queryId)) {
        filter._id = new mongoose.Types.ObjectId(queryId);
    }

    if (queryEmail) {
        filter.email = queryEmail;
    }

    try {
        const filteredUserData = await mongoose.connection.collection('user').find(filter).toArray();
        res.json(filteredUserData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching user data." });
    }
});



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

app.get('*', (req,res)=>{
    res.json("api not found");
})

app.listen(PORT ,(req,res)=>{
    connect_mongodb();
    console.log("server running", {PORT});
})