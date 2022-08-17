//jshit esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = 3000
const https = require("https")


app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/signup.html')
});

app.get("/contact", (req, res) => {
  res.send('contact me!')
});
app.get("/about", (req, res) => {
  res.send('about!')
});


app.post("/", (req, res) =>{

const firtName = req.body.FName;

 //d9db8451df id
 const data = {
    members:[
       {
         email_address: firtName,
        status: "subscribed",
         merge_fields: {
            FNAME: firtName,
             LNAME: "subscribed"
         }
      }
     ]
};


 const jsonData = JSON.stringify(data)
const url = "https://us12.api.mailchimp.com/3.0/lists/d9db8451df"
const options ={
    method: "POST",
  auth:"rmazov@hotmail.com:92339d0443342dc54a5483d7d9aff637-us12"

}

const request = https.request(url, options, function(response) {


  if (response.statusCode === 200){
    res.send("susccessfully subscribed")
  }else{
    res.send("there was an error with signing up,")
  }
response.on("data", function(data){
  console.log(JSON.parse(data));
 })



 } )

 request.write(jsonData);
request.end();

})

app.listen(process.env.PORT || port, () => {
   console.log(`Example app listening on port ${port}`)

 });


// const mailchimp = require("@mailchimp/mailchimp_marketing");
// const listId = "d9db8451df";
// mailchimp.setConfig({
//   apiKey: "92339d0443342dc54a5483d7d9aff637-us12",
//   server: "us12",
// });
// async function run() {
//   const response = await mailchimp.lists.addListMember(listId,{
//       email_address: "firtssgffgdmde@hdsds.com",
//       status: "subscribed",
//       merge_fields: {
//    FNAME: "subscdribed",
//    LNAME: "subscribed"
//  }
// });
// console.log(
//     `Successfully created an audience. The audience id is ${response.id}.`
//   );
// }
// run();
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });
