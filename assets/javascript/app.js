var firebaseConfig = {
  apiKey: "AIzaSyCQwhMpGPFS8wqCkRypCXUaVxOe2mZgml0",
  authDomain: "test-7c38b.firebaseapp.com",
  databaseURL: "https://test-7c38b.firebaseio.com",
  projectId: "test-7c38b",
  storageBucket: "test-7c38b.appspot.com",
  messagingSenderId: "1084629551515",
  appId: "1:1084629551515:web:ca74a9aa882f8a3c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var localArray = [],
  next,
  remain,
  name,
  dest,
  start,
  freq;
var currentTime = moment().format("X");
var nextTrainTime = start + freq;

function updateTrainInfo() {
  for (i = 0; i < localArray.length; i++) {
    setNextTrainTimeAndTimeUntilDepart(localArray[i].time, localArray[i].freq);
    localArray[i].next = next;
    localArray[i].remain = remain;
  }
  database.ref().set({
    databaseArray: localArray
  });
}

function setNextTrainArrival(start, freq) {
  // var startUnix = moment(start, "h:mm A").format("X");
  // var nextArrival = start + freq;
  // var nextTrainTime = moment(nextTrainTimeUnix, "X").format("h:mm A");
  // var minsLeft = moment(diffUntilNextTrainUnix, "X").format("m");

  //remain = timeUntilDepart;

  if (nextTrainTime < currentTime) {
    nextTrainTime = nextTrainTime + freq;
  } else if (nextTrainTime === currentTime) {
    // display "BOARDING"
  }
  // push nextTrainTime and minsLeft to local array
  // display nextTrainTime

  // display minsLeft
}

setInterval(updateTrainInfo, 60000);

$("#submitBtn").on("click", function(event) {
  event.preventDefault();
  name = $("#tNameInput")
    .val()
    .trim();
  dest = $("#tDestInput")
    .val()
    .trim();
  start = $("#tFirstTimeInput")
    .val()
    .trim();
  freq = $("#tFreqInput")
    .val()
    .trim();
  database.ref().set({
    tName: name,
    tDest: dest,
    tStart: start,
    tFreq: freq
  });
  $("form").trigger("reset");
  setNextTrainArrival();
});

database.ref().on("value", function(snapshot) {
  if (snapshot.child("databaseArray").exists()) {
    localArray = snapshot.val().databaseArray;
    loadTrainInfo();
  } else {
    localArray = [];
  }
});

function loadTrainInfo() {
  console.log(snapshot.val().tName);
  var newRow = $("<tr>");
  var newName = $("<td>").text(snapshot.val().tName);
  var newDest = $("<td>").text(snapshot.val().tDest);
  var newStart = $("<td>").text(snapshot.val().tStart);
  var newFreq = $("<td>").text(snapshot.val().tFreq);
  var newMins = $("<td>").text();
  newRow.append(newName, newDest, newStart, newFreq);
  $("tbody").prepend(newRow);
}
