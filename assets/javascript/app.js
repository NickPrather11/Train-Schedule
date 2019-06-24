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
var name, dest, start, freq;

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
});

database.ref().on("value", function(snapshot) {
  console.log(snapshot.val().tName);
  var newRow = $("<tr>");
  var newName = $("<td>").text(snapshot.val().tName);
  var newDest = $("<td>").text(snapshot.val().tDest);
  var newStart = $("<td>").text(snapshot.val().tStart);
  var newFreq = $("<td>").text(snapshot.val().tFreq);
  var newMins = $("<td>").text();
  newRow.append(newName, newDest, newStart, newFreq);
  $("tbody").prepend(newRow);
});
