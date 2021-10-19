const express=require('express')
const User=require('./Routes/user')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()
const port=8000

app.use(cors())
app.use(bodyParser.json())
app.use('/user',User)



app.get('/',function(req,res){
    res.send("welcome to express")
})


app.listen(port,function(){
    console.log("Server is started")
})