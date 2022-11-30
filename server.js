const express=require("express");
const app=express();
const morgan=require("morgan");
const {Pool}=require('pg');
require("dotenv").config()
app.use(morgan())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
let pool=new Pool()
app.get(`/`,(req,res)=>{
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="/info/get" method="GET">
            <input type="submit" value="GET">
        </input>
        </form>
        <br/>
        <form action="/info/add" method="POST">
        
        <label for="add">Add</label>
        <input type="text" name="add" id="add"/>
        <input type="submit" value="Add" />
        
    </form>
    <br/>
    <form action="/info/delete" method="POST">
    <label for="delete">Delete</label>
    <input type="text" name="delete" id="delete"/>
    <input type="submit" value="Delete" />
    
</form>
<br/>
<form action="/info/update" method="POST">
<label for="oldValue">Old Value</label>
<input type="text" name="oldValue" id="oldValue"/>
<label for="newValue">New Value</label>
<input type="text" name="newValue" id="newValue"/>
<input type="submit" value="Update" />

</form>
    </body>`)
})


app.get(`/info/get`,async(req,res)=>{
    try{
        pool.connect(async(err,client,release)=>{
let resp=await client.query(`SELECT * from test`);
release()
res.json(resp.rows)
        })
    }
    catch(error){
        console.log(error)
    }

})

app.post(`/info/add`,async(req,res)=>{
    try{
        pool.connect(async(err,client,release)=>{
let resp=await client.query(`INSERT INTO test (name) VALUES ('${req.body.add}')`);
release()
res.redirect('/info/get')
        })
    }
    catch(error){
        console.log(error)
    }

})

app.post(`/info/delete`,async(req,res)=>{
    try{
        pool.connect(async(err,client,release)=>{
let resp=await client.query(`DELETE FROM  test WHERE name='${req.body.delete}'`);
release()
res.redirect('/info/get')
        })
    }
    catch(error){
        console.log(error)
    }

})
app.post(`/info/update`,async(req,res)=>{
    try{
        pool.connect(async(err,client,release)=>{
let resp=await client.query(`UPDATE test SET name='${req.body.newValue}' WHERE name='${req.body.oldValue}'`);
release()
res.redirect('/info/get')
        })
    }
    catch(error){
        console.log(error)
    }

})
app.listen(3000,()=>{
    console.log("listening on port 3000")
})