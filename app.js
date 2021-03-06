var express = require("express"),
    app = new express(),
    bodyParser = require("body-parser");
//set jade view folder
app.set("views", "./views");
//set what i use in my view
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));

app.use(bodyParser.urlencoded({extended: true}));
//default route
app.get("/", function (req, res) {
    res.render('home.jade', {title: "Home"});
});


//route to /admin/rooms
var adminRouter = require("./admin");
app.use("/admin",adminRouter);

var apiRouter = require("./api");
app.use("/api",apiRouter);
app.listen(3000, function () {
    console.log("running .........");
});