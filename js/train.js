$( document ).ready(function() {


      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBZnmwy1kFnPgDIoduMMf0uGRaLBgoEb7w",
        authDomain: "train-schedule-60315.firebaseapp.com",
        databaseURL: "https://train-schedule-60315.firebaseio.com",
        projectId: "train-schedule-60315",
        storageBucket: "train-schedule-60315.appspot.com",
        messagingSenderId: "191259008691"
      };
      firebase.initializeApp(config);
      var database = firebase.database();
        
        
            $("#trainbtnadd").on("click",function(event){
            event.preventDefault();
            
                var train= $("#train-name-input").val().trim();
            var destination =$("#destination-input").val().trim();
            var firstTrainInput= moment($("#first-train-input").val().trim(), "hh:mm").subtract(1, "years").format("X");
            var frequency= $("#frequency-input").val().trim();
        

		// Console.log
		console.log(train);
		console.log(destination);
		console.log(firstTrainInput);
        console.log(frequency);
        
        var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));

        // 	// clears ID
		// $("#train-name-input").val("");
		// $("#destination-input").val("");
		// $("#first-train-input").val("");
		// $("#frequency-input").val("");
        

    var newTrainArriving ={
        trains:train,
        departing:destination,
        arriving:firstTrainInput,
        onMin: frequency,
        minutes:minutes,
	
};


 // Push to database
 database.ref().push(newTrainArriving);

 	// Clears ID
     $("#train-name-input").val("");
     $("#destination-input").val("");
     $("#first-train-input").val("");
     $("#frequency-input").val("");

});
     database.ref().on("child_added", function(childSnapshot, prevChildKey){
		console.log(childSnapshot.val());

		// Snapshot for Firebase.
		var firebaseTrain = childSnapshot.val().trains;
		var firebaseDestination = childSnapshot.val().departing;
		var firebaseArriving = childSnapshot.val().arriving;
		var firebaseFrequency = childSnapshot.val().onMin;
		
		var diffTime = moment().diff(moment.unix(firebaseArriving), "minutes");
		var remain = moment().diff(moment.unix(firebaseArriving), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - remain;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
	// Console.log
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append 
        $("#trainTable > tbody").append("<tr><td>" + firebaseTrain + "</td><td>" + 
        firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + 
        nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

    });
});

