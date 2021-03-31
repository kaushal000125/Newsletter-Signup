
const mailchimp=require("@mailchimp/mailchimp_marketing");

const express=require("express");

const https=require("https");
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
//app.use(express.json());

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


mailchimp.setConfig({
  apiKey:"YOUR API KEY HERE",
  server:"usX"                      //X- last character of API KEY
});


app.post("/",function(req,res){
  const fName=req.body.x;
  const lName=req.body.y;
  const email=req.body.z;
  const listId="YOUR LIST ID";
const data={
  fName:fName,
  lName:lName,
  email:email

};
const run= async() => {
  const response = await mailchimp.lists.addListMember(listId,{
    email_address: data.email,
    status:"subscribed",
    merge_fields:{
      FNAME:data.fName,
      LNAME:data.lName
    }
  });
    res.sendFile(__dirname+"/success.html");
  console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );
}
run();
   run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
});
