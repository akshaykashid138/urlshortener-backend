const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
require('dotenv').config()
const Url=require('./model/urls')
const userRouter=require('./routes/auth')
const urlRouter=require('./routes/url')
const redirectRouter=require('./routes/redirect')

const app=express()


app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log("database connected"))
        .catch((err)=> console.log("something went wrong",err))

app.use('/api/user',userRouter)
app.use('/api/shorten',urlRouter)
app.use('/api/redirect', redirectRouter)

app.get('/:hash',(req,res)=>{
    const id=req.params.hash
    

    Url.findOne({_id:id},(err,doc)=>{
        if(doc){
            console.log(doc.url)
            res.redirect(doc.url)
        }else{
            res.redirect('/')
        }
    })
    
})

const PORT=process.env.PORT || 4000
app.listen(PORT,()=> console.log("server started"))
