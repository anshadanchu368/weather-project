
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  
    res.sendFile(__dirname+"/index.html");
   
  });

app.post("/",function(req,res){
     const query=req.body.city;
     const appID="333c34b13b2d527999c30efc8520ba58";
     const units="metrics";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"s&appid="+ appID;
 https.get(url,function(response){
     console.log(response.statusCode);
    
    response.on("data",function(data){
        const weatherApp=JSON.parse(data)
        const temp=weatherApp.main.temp
        const icon = weatherApp.weather[0].icon;
        const image= "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>temperature in "+query+" is </h1>"+temp+"<p>degree celcius</p>");
        res.write("<img src="+ image +">");
         res.send();
       })
    })
})

app.listen(3000,function(){
    console.log("server runs on port 3000");
})


