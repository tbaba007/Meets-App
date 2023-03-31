const express =require('express');
const AppPool = require("../db/dbConnection");
const app=express.Router();


app.use(function(req,res,next){
    next();
})


app.get('/GetAll',(req,res)=>{
    AppPool.query('select * from meets."Sports" where isActive=true order by "SportId"',(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result.rows)
        }
    })
})


app.post('/AddNew',(req,res)=>{
    const {Name}=req.body;
    AppPool.query('insert into meets."Sports"("Name","IsActive") values ($1,$2)',[Name,true],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result.rows)
        }
    })
})

app.put('/Update/:id',(req,res)=>{
    const {Name}=req.body;
    const {id}=req.params;
    AppPool.query('update meets."Sports" set "Name"=$1 where "SportId"=$2',[Name,id],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.sendStatus(200)
        }
    })
})


app.put('/Deactivate/:id',(req,res)=>{
    const {id}=req.params;
    AppPool.query('update meets."Sports" set isActive=false where "SportId"=$1',[id],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.sendStatus(200)
        }
    })
})


module.exports=app;