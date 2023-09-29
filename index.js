import express from "express"
import mongoose from "mongoose";

const app = express();



app.use(express.json())


app.get("/",async(req,res)=>{
 let results = await mongoose.connection.collection("user").find().toArray()
 res.json(results)
})

app.get("/home",(req,res)=>{
    console.log('home')
})

app.post("/",async(req,res)=>{



 let result =  await  mongoose.connection.collection("user").insertOne(req.body)
 
    console.log(req.body)

    res.json(result)



})


app.put("/:id",async(req,res)=>{
    console.log(req.params)
    let toConvertedID = new mongoose.Types.ObjectId(req.params.id)
    let result = await mongoose.connection.collection("user").updateOne({_id:toConvertedID},{$set:{name:req.body.name}})
    res.json(result)
})

app.delete("/:id",async(req,res)=>{
    console.log(req.params)
    let toConvertedID = new mongoose.Types.ObjectId(req.params.id)
    let result = await mongoose.connection.collection("user").deleteOne({_id:toConvertedID})
res.json(result)
})

app.listen(3000,()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/soft');
    console.log('server starting on port 3000')
})
