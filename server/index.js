const express=require('express');
const cors =require('cors');
const bodyparser=require('body-parser');
const app=express();
const PORT=process.env.PORT ;


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/users',require('./Routes/users'))
app.use('/sports',require('./Routes/sports'))
app.use('/marketplace',require('./Routes/marketplace'))

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})