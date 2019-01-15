var express = require("express");
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var app = express();


app.get("/test",function(req,res){
  var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey:'k-B-HtEAvUgwQ-9pG6Hnw4xX_apnRtj_aokRFEjuBXv6'

});

var params = {
  url:"https://www.lg.com/ca_en/images/tvs/42cs560/gallery/lg-monitors-cs560-large01.jpg"
};

visualRecognition.classify(params, function(err, response) {
  if (err)
    console.log(err);
  else
  //Store response into a string
    var result= JSON.stringify(response, null, 2);
    //res.write(response.images.constructor.name + "\n");
    //res.write(response.images[0].classifiers.constructor.name+"\n");
    //res.end(response.images[0].classifiers[0].classes[0].score+"\n");
   var class_col= response.images[0].classifiers[0].classes;
   //to get the array of classes (category classification)
   for(i=0; i<class_col.length;i++){
       res.write(class_col[i].class + "\n") //getting the class name
       res.write(class_col[i].score + "\n") //getting the score
   }
   res.end("END");
    console.log(result);
    
});

})


// we take this away now so we start listening on heroku and not our comp-->>
var listener = app.listen(4000,process.env.IP,function(){
	//var listener = app.listen(process.env.PORT,process.env.IP,function(){
	console.log("server has started");
	 console.log('Listening on port ' + listener.address().port);
});