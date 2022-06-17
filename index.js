const express=require('express')
const { checkcookie, signupsub, loginsub, update, getdata } = require('./database')
const app =express()
const path=require('path')
app.listen(80)
app.use(express.json())
app.use(express.urlencoded())

app.get('/api/update',async(req,res)=>{
    let {bpm,sp02,bodytemp}=req.query
    
    update(bpm,sp02,bodytemp)
    res.send('ok')
})
app.get('/api/alldata',async(req,res)=>{
    let da=await getdata()
    res.json(da)
})

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./h1.html'))
})
app.get('/signup',(req,res)=>{
    res.sendFile(path.resolve('./h2.html'))
})

app.post('/loginsub',async(req,res)=>{
    let {username,password}=req.body
    let r=await loginsub(username,password)
    if(r){
        res.sendFile(path.resolve('./h3.html'))
    }else{
        res.sendFile(path.resolve('./h1.html'))
    }
})
app.post('/signupsub',async(req,res)=>{
    let body =req.body
    signupsub(body)
    res.sendFile(path.resolve('./h1.html'))
})