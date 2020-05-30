const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = new express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("App connected Port 5000"));

mongoose.connect("mongodb://localhost/blog_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

const BlogPost = require("./models/BlogPost");

app.get("/", (req, res) => {
  BlogPost.find({}, (err, posts) => {
    res.render("index", {
      blogpost: posts,
    });
  });
});

app.get("/post/:id", (req, res) => {
  BlogPost.findById(req.params.id, (err, detailPost) => {
    res.render("post", { detailPost });
  });
});

app.get("/posts/new", (req, res) => {
  //console.log("da nhan");
  res.render("createpost");
});

app.post("/posts/create", (req, res) => {
  BlogPost.create(req.body, (err, blog) => {
    res.redirect("/");
  });
});
