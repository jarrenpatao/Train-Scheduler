var config = {
  apiKey: "AIzaSyCEix6B4xeRwTzvrE0Wvq20YcNVYsoz4do",
  authDomain: "my-awesome-project-84d5b.firebaseapp.com",
  databaseURL: "https://my-awesome-project-84d5b.firebaseio.com",
  projectId: "my-awesome-project-84d5b",
  storageBucket: "my-awesome-project-84d5b.appspot.com",
  messagingSenderId: "675372758360"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var name = $("#train-name-input").val().trim();
  var destination = $("#dest-input").val().trim();
  var initialTrain = $("#first-train-input").val().trim();
  var frequency = $("#freq-input").val().trim();

  var newTrain = {
    name: name,
    dest: destination,
    first: initialTrain,
    freq: frequency
  };

database.ref().push(newTrain);

alert(newTrain.name + " successfully added");

$("#train-name-input").val("");
$("#dest-input").val("");
$("#first-train-input").val("");
$("#freq-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var initialTrain = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;
  var trainTimeConverted = moment(initialTrain, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  var timeRemain = diffTime % trainFreq;
  var minutesLeft = trainFreq - timeRemain;
  var nextArrival = moment().add(minutesLeft, "minutes").format("HH:mm");

  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(trainFreq),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesLeft),
  );

  $("#train-table > tbody").append(newRow);

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

