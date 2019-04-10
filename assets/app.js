 //initialize the firebase app
var config = {
    apiKey: "AIzaSyDRuDvJTkyX4c9NE6c1u1RyfJmy5gbyJHc",
    authDomain: "classact-55947.firebaseapp.com",
    databaseURL: "https://classact-55947.firebaseio.com",
    projectId: "classact-55947",
    storageBucket: "",
    messagingSenderId: "607895566077"
};
firebase.initializeApp(config);
var database = firebase.database();
// initial values
var train = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
// Current Time


//capture button click 
$("#submitForm").on("click", function (event) {
    event.preventDefault();
    //get value from the user input
    train = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    //push the user input value to the firebase database
    database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,

    });

    $("#train-input").val("")
    $("#destination-input").val("")
    $("#firstTrain-input").val("")
    $("#frequency-input").val("")
});

//referencing firebase when adding new values
database.ref().on("child_added", function (childSnapShot) {
    console.log(childSnapShot);
    console.log(childSnapShot.val());
    //getting the data from firebase's new added values 
    var domTrain = childSnapShot.val().train;
    var domDestination = childSnapShot.val().destination;
    var domFrequency = childSnapShot.val().frequency;
    var domFirstTrain = childSnapShot.val().firstTrain;
    //create the new row  
    var newRow = $("<tr>").append(
        $("<td>").text(domTrain),
        $("<td>").text(domDestination),
        $("<td>").text(domFrequency),
    );

    
    var tFrequency = domFrequency;

   
    var firstTime = domFirstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    var tMinutesTillTrain =  tFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    newRow.append($("<td>").text(nextTrain));
    newRow.append($("<td>").text(tMinutesTillTrain));
    $("tbody").append(newRow);

});


