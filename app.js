//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Free speech stands as a cornerstone of democratic societies, embodying the fundamental right to express ideas, opinions, and beliefs without fear of censorship or reprisal. It serves as a catalyst for progress, fostering an environment where diverse voices can be heard, debated, and challenged. Free speech enables the exchange of knowledge, the exploration of new perspectives, and the discovery of innovative solutions to societal issues. It is through the unfettered expression of thoughts and ideas that societies can grow, adapt, and evolve. Free speech empowers individuals to hold power to account, to advocate for justice, and to champion causes that promote equality and human rights. It is a vital pillar that safeguards personal autonomy, encourages critical thinking, and fuels the engines of social change.This site allows you to anonymously post your thoughts to the world to bring a change";
const aboutContent ="I am Anusa De, a third year undergraduate at Kalinga Institute of Industrial Technology,Bhubaneswar.\nThis Webapp allows you to compose your thoughts to the world to infinity &beyond!\nExpress your thoughts by composing now.";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://subhashis:Subhashis@123@cluster0.ymex30v.mongodb.net/blogDB", {useNewUrlParser: true,useUnifiedTopology: true });
//mongoose.connect("mongodb://0.0.0.0:27017/blogDB",{useNewUrlParser: true,useUnifiedTopology: true });
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
