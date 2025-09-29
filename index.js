import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

function Posts (title, author, text) {
  this.title = title;
  this. author = author;
  this.text = text;
}

var WebsitePosts = [
  new Posts("Egyptian Food is the Best in the World", "Unpopular Opinions", "The food is so good because it just is"),
  new Posts("Soccer is the Best Sport Ever", "Unpopular Opinions", "Although this opinion is not that unpopular it just had to be said beecause it is true"),
  new Posts("Minecraft is the Best Videogame Ever Created", "Unpopular Opinions", "It is the best sandbox game and is so nostalgic I don't think more needs to be said")
];
var UserPosts = [];


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {UserPosts, WebsitePosts});
});
app.get("/home", (req, res) => {
  res.redirect("/");
});
app.get("/post", (req, res) => {
  res.render("post.ejs");
});
app.get("/account", (req, res) => {
  res.render("account.ejs", {UserPosts});
});

app.post("/account/post", (req, res) => {
  UserPosts.push(new Posts(req.body["title"], "You", req.body["post"]));
  res.redirect("/account");
});

//editing and deleting functions
app.post("/account/delete/:index", (req, res) => {
  const index = parseInt(req.params.index);
  UserPosts.splice(index, 1);
  res.redirect("/account");
});
//editing functions
app.post("/account/edit/:index", (req, res) => {
  const index = parseInt(req.params.index);
  res.render("edit.ejs", {
    currPostTitle: UserPosts[index].title,
    currPostText: UserPosts[index].text,
    currIndex: index
  });
});
app.post("/account/edit/done/:index", (req, res) => {
  const index = parseInt(req.params.index);
  UserPosts[index].title = req.body["title"];
  UserPosts[index].text = req.body["post"];
  res.redirect("/account");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});