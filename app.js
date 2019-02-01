var express = require("express"),
    app     = express(),
    bodyParser= require("body-parser"),
    mongoose = require("mongoose"),
    Food     = require("./models/food");
    
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/food_app_v1", { useNewUrlParser: true });



// Food.create({
//         name:"Indian Palace",
//         image: "https://farm8.staticflickr.com/7417/27524807344_7fab26b910.jpg"
// },function(err,food)
// {
//     if(err)
//     {
//         console.log(err)
//     }
//     else{
//         console.log("newly created campground");
//         console.log("/foods");
//     }
// })

// var foods = [
//         {name: "Thai" , image: "https://pixabay.com/get/eb35b7072af6013ed1584d05fb1d4e97e07ee3d21cac104496f3c879a0ecb5be_340.jpg"},
//         {name: "Indian Palace", image :"https://farm8.staticflickr.com/7417/27524807344_7fab26b910.jpg"}
//     ]
    

app.get("/",function(req,res)
{
    res.render("landing");
})    

app.get("/foods", function(req,res)
{
        Food.find({},function(err, allFood)
        {
            if(err)
            {
                console.log(err)
            }
            else{
                res.render("foods",{foods:allFood})
            }
        })
})


app.post("/foods",function(req,res)
{
    console.log(req.body.name);
    var name = req.body.name;
    var image = req.body.image;
    var newFoods = {name:name ,image:image };
    
    Food.create(newFoods,function(err,food)
{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("newly created campground");
        res.redirect("/foods");
    }
})
    
    // foods.push(newFoods);
    // res.redirect("/foods");
})    

app.get("/foods/new",function(req, res) {
    res.render("new")
})


app.get("/foods/:id",function(req,res)
{
    Food.findById(req.params.id, function(err,foundFood)
    {
        if(err)
        {
            console.log(err);
        }else{
            res.render("show",{food : foundFood});
        }
    })
})


app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("Server Started!!!!!");
})