const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static (path.join(__dirname, "public")));


let posts =[
    {
        username : "Coder",
        content : "I love coding"
    },
    {
        username : "Manali Patel",
        content : "Hardwork is important to achieve success"
    },
    {
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
    posts.push({username , content})
    // res.send("post request working");
    res.redirect("/posts");
})

app.listen(port , ()=>{
    console.log(`server is listening on port ${port}`);
})