const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); //generate random unique ids
const methodOverride = require("method-override") //

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));  // override with POST having ?_method=PATCH

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static (path.join(__dirname, "public")));


let posts =[
    {
        id : uuidv4(),
        username : "Coder",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "Manali Patel",
        content : "Hardwork is important to achieve success"
    },
    {
        id : uuidv4(),
        username : "SwetaKumari",
        content : "I got selected for my 1st internship",
    }
];


app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
})

app.get("/posts/new" , (req, res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req, res)=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id , username , content})
    // res.send("post request working");
    res.redirect("/posts");
})

app.get("/posts/:id",(req, res)=>{
   let { id } = req.params;
   let post = posts.find((p) => id === p.id);
   console.log(id);
//    res.send("request working");
   res.render("show.ejs", {post});
})


app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(newContent)
    res.redirect("/posts")
})


app.get("/posts/:id/edit",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs" , {post});
})


app.listen(port , ()=>{
    console.log(`server is listening on port ${port}`);
})