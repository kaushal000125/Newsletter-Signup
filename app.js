
const mailchimp=require("@mailchimp/mailchimp_marketing");

const express=require("express");

const http=require("http");
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
//app.use(express.json());

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


mailchimp.setConfig({
  apiKey:"a015bce97196481de4e3a9a2a5a10a0f-us1",
  server:"us1"
});


app.post("/",function(req,res){
  const fName=req.body.x;
  const lName=req.body.y;
  const email=req.body.z;
  const listId="4b52020b84";
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
      LName:data.lName
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
