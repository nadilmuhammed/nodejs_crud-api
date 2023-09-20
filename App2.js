import express from "express";


const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true})); /*to handle the form*/

const userData = [
    {id:1,name:"nadil",company:"google"},
    {id:2,name:"nilumon",company:"amazon"},
    {id:3,name:"nidha",company:"flipkart"},
];


app.get('/user', (req,res) =>{
    const query =parseInt(req.query.id);
    const UserName =req.query.name;
    const filteredUserData = userData.filter((data) => {
        if (query && UserName) {
           return data.id === query && data.name === UserName;
        }else{
            return data;
        }
    });

    res.json(filteredUserData);
})

app.post('/user/:id', (req,res) =>{
        const userId = parseInt(req.params.id);

        const filteredUserData = userData.filter((data) => data.id === userId);
        res.json(filteredUserData);
})

app.get("*", (req,res) =>{
    res.json("not found")
})

app.listen(PORT , (req,res) =>{
    console.log("server is running", {PORT});
})