const Article=require("../models/article")
const multer=require("multer")
const express=require('express');
const { getAllArticle, getArticleById, getArticleByAuthorId } = require("../controllers/article");
const articleRouter=express.Router()
let fileName='';
const myStorage = multer.diskStorage({
    destination: './uploads' ,// Destination folder for uploaded files
    filename: (req, file, redirect) => {
    //   cb(null,Date.now() + '-' + file.originalname);
     // Rename the file to include the timestamp
     let date=Date.now()
     let fl=date+'.'+file.mimetype.split('/')[1]
     redirect(null,fl)
     fileName=fl;
    },
  });
  const upload = multer({ storage: myStorage });
articleRouter.post('/all',upload.any('image'),(req,res)=>
{
    let data=req.body;
    console.log(req.body);
    const article=new Article(data)
    article.date=new Date()
    article.image=fileName;
    article.tags=data.tags.split(',')
   article.save()
    .then((result)=>
{
    console.log(fileName);
fileName='';
res.status(201).json({
    message:'done',
    article:result
})
}).catch((err)=>
{
    res.status(500).json({
        message:'server error',
        error:err
    })
})

})

articleRouter.put('/update/:id',upload.any('image'),(req,res)=>
    {
        const {id}=req.params
        let data=req.body;
        console.log(req.body);
        data.date=new Date()
if(fileName.length>0)
    {
        data.image=fileName;
    }
      
        data.tags=data.tags?.split(',')
        Article.findByIdAndUpdate({_id:id},data,{new:true})
        .then((result)=>
    {
        console.log(fileName);
    fileName='';
    res.status(201).json({
        message:'done',
        article:result
    })
    }).catch((err)=>
    {
        res.status(500).json({
            message:'server error',
            error:err
        })
    })
    
    })
articleRouter.get('/',getAllArticle)
articleRouter.get('/:id',getArticleById)
articleRouter.get("/searchBy/:id",getArticleByAuthorId)
module.exports=articleRouter