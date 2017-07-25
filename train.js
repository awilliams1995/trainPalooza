 	  
    var config = {
    apiKey: "AIzaSyD_DCWxKqlqGqsPWxNBEtAay9Na5m-m49w",
    authDomain: "tuesdayclass1-30d56.firebaseapp.com",
    databaseURL: "https://tuesdayclass1-30d56.firebaseio.com",
    projectId: "tuesdayclass1-30d56",
    storageBucket: "tuesdayclass1-30d56.appspot.com",
    messagingSenderId: "99260628666"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#submit").on("click", function(event) {
    	event.preventDefault();
    	var name = $("#trainName").val().trim()
    	var destination = $("#destination").val().trim()
    	var firstTrain = $("#firstTrain").val().trim()
    	var frequency = $("#frequency").val().trim()
  $("input[type=text], textarea").val("");
       database.ref().push({
      	nameValue : name,
        destinationValue : destination,
        frequencyValue : frequency,
        firstTrainValue: moment().startOf("day").add(moment.duration(firstTrain)).valueOf(),
	      });
    });

database.ref().on("child_added", function(snap) {
    var snapObject= snap.val();
    var momentInQuestion = moment(snapObject["firstTrainValue"]);
    var status = moment().valueOf() - momentInQuestion.valueOf();
    var amountToAdd = 0;
    var time;
    var tableRow = $("<tr>");
  tableRow.append("<td>"+snapObject["nameValue"]+"</td>");
  tableRow.append("<td>"+snapObject["destinationValue"]+"</td>");
  tableRow.append("<td>"+snapObject["frequencyValue"]+"</td>");
  //tableRow.append("<td>"+snapObject["firstTrainValue"]+"</td>");
  if (status > 0){
    amountToAdd = (parseInt(snapObject["frequencyValue"])*60000)-(status % (parseInt(snapObject["frequencyValue"]*60000)));
    time = moment().add(moment.duration(amountToAdd));
    tableRow.append("<td>"+time.calendar()+"</td>"+"<td>"+ Math.ceil(amountToAdd/60000) +"</td>");
   }else{
  tableRow.append("<td>"+ momentInQuestion.calendar()+"</td>");
  tableRow.append("<td>"+ Math.ceil(momentInQuestion.diff(moment(),"ms")/60000) +"</td>");
}
  $(".table").append(tableRow);
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
