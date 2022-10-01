const express = require("express")
const request = require("request")
const bodyParser=require("body-parser")
const https = require("https")
const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+ "/sign.html");
});
app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email = req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_field:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    }
    const jsonData =JSON.stringify(data)
    const url="https://us9.api.mailchimp.com/3.0/lists/a7bb99608d";
    const option={
        method:"POST",
        auth:"verma:a12de39481e38662705b61f272470d966-us9"
    }
    const request=https.request(url,option,function(response){
        if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT|| 500,function(){
    console.log('server is running on port 4000')
})
//06d7e8a842883216a5719118f505241a-us9
//a7bb99608d
