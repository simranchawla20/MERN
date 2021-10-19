const express=require('express')
const route=express.Router()

var {MongoClient,ObjectId}=require('mongodb')
var mongoUrl="mongodb://localhost:27017"

//getting data from database
route.get("/",function(req,res){
    MongoClient.connect(mongoUrl,function(err,cluster){
        if(err){
            res.send("error while connecting with db")
        }else{
            var dbRef=cluster.db('merndb')
            var collectionRef=dbRef.collection('mernCollection')
            collectionRef.find().toArray(function(err,succressResponse){
                if(err)
                {
                    res.send("error while accessing the data")
                }
                else{
                    res.send(succressResponse)
                }
            })
        }
    })
})

route.get('/getSUser/:id',function(req,res){
    var id=req.params.id
    MongoClient.connect(mongoUrl,function(err,cluster){
        if(err){
            res.send("error while connecting with db")
        }else{
            var dbRef=cluster.db('merndb')
            var collectionRef=dbRef.collection('mernCollection')
            collectionRef.findOne({"_id":ObjectId(id)},function(err,data){
                if(err)
                {
                    res.send("Error while getting data")
                }
                else{
                    res.send(data)
                }
            })
        }
    })
})

//posting data to database from clientSide
route.post('/userdata',function(req,res){                //whenever user goes to /userdata link ,then data get posted
    var name=req.body.uname
    var password=req.body.upassword
    var userData={
        name:name,
        password:password
    }
    MongoClient.connect(mongoUrl,function(err,cluster){
        if(err){
            res.send("error while connecting with db")
        }else{
            var dbRef=cluster.db('merndb')
            var collectionRef=dbRef.collection('mernCollection')
            collectionRef.insertOne(userData,function(err,succressMsg){
                if(err)
                {
                    res.send("error while inserting data")
                }
                else{
                    res.send("Data inserted Successfully")
                }
            })
        }
    })
})

route.put('/update/:id',function(req,res){
    var id=req.params.id
    var name=req.query.uname
    var password=req.query.upassword
    var updateData={
        "name":name,
        "password":password
    }
    MongoClient.connect(mongoUrl,function(err,cluster){
        if(err){
            res.send("error while connecting with db")
        }else{
            var dbRef=cluster.db('merndb')
            var collectionRef=dbRef.collection('mernCollection')
            collectionRef.updateOne({"_id":ObjectId(id)},{
                $set:updateData
            },function(err,msg){
                if(err){
                    res.send("error while updating data")
                }else{
                    res.send("updated successfully")
                }
            })
        }
    })
})

route.delete('/delete/:id',function(req,res){
    var id=req.params.id
    console.log(id)
    MongoClient.connect(mongoUrl,function(err,cluster){
        if(err){
            res.send("error while connecting with db")
        }else{
            var dbRef=cluster.db('merndb')
            var collectionRef=dbRef.collection('mernCollection')
            collectionRef.deleteOne({_id:ObjectId(id)},function(err,succressMsg){
                if(err)
                {
                    res.send("Error while deleting the record")
                }
                else{
                    res.send("Deleted Successfully")
                }
            })
        }
    })
})


module.exports=route