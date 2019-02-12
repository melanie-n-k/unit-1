/* javascript sheet mkohls */

var mydiv = document.getElementById("mydiv");
mydiv.innerHTML = "Hi there!";

//initialize function called when the script loads
function initialize(){
    cities();
    addColumns();
    addEvents();
    clickme();
};

//function to create a table with cities and their populations
function cities(){
    //define two arrays for cities and population
    var cityPop = [
        {
            city: 'Caerdydd',
            population: 362756
        },
        {
            city: 'Abertawe',
            population: 245480
        },
        {
            city: 'Caerffili',
            population: 180795
        },
        {
            city: 'Gwynedd',
            population: 123742
        },
        {
            city: 'Ceredigion',
            population: 73076
        }
    ];

    //append the table element to the div
    $("#mydiv").append("<table>");

    //append a header row to the table
    $("table").append("<tr>");

    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>Population</th>");

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
};



//debugging and commenting practice below
//function to add columns to table
function addColumns(cityPop){

//for each row in the table:
    $('tr').each(function(i) {
//starting at the first row, which is i[0]:
    	if (i === 0){
//put "City Size" in as the header for this first row
    		$(this).append("<th>City Size</th>");
        //then, for the other rows we want to put our city array
    	} else {
        var cityPop = [
            {
                city: 'Caerdydd',
                population: 362756
            },
            {
                city: 'Abertawe',
                population: 245480
            },
            {
                city: 'Caerffili',
                population: 180795
            },
            {
                city: 'Gwynedd',
                population: 123742
            },
            {
                city: 'Ceredigion',
                population: 73076
            }
        ];
        //define a size variable to make the "size" column
        let citySize;
//make three separate categories for city size
        if (cityPop[i-1].population < 100000){
          citySize = 'Small';
        } else if (cityPop[i-1].population < 300000){
          citySize = 'Medium';
        } else {
          citySize = 'Large';
        }
        //add the city size column to the table
        $(this).append(citySize);
      }
    }
  )};

//function to change the table's colors every time you mouse over it
function addEvents() {
//define the function that will run when you mouse over the table
  $('table').mouseover(function(){
    //we want to get a random color, so we will start by creating a variable to hold the string
  	var color = "rgb(";
//set up a for loop to iterate through three digits of a number to generate the final number
  	for (var i = 0; i < 3; i++) {
      //use .random to generate random numbers and math.round to get rid of decimals
  		var random = Math.round(Math.random() * 255);
      //add the random number to the "color" string
  		color += random;
//loop through until you have a whole set of numbers that css will recognize as a color
  		if (i<2){
  			color += ",";
  		} else {
  			color += ")";
  	  };
//finally, link the javascript to the css stylesheet
  	  $(this).css('color', color);
    }

  });
};

//function to make a text alert that appears when you click the table
function clickme(){
  //.on() is a method I had to do a lot of research on but essentially it takes a function as a parameter
  $('table').on('click', function() {
    //this is the function that will run when you click the table
    alert("Hey, you clicked me!");
});
};
//call the initialize function when the document has loaded
$(document).ready(initialize);

//Module 3
//define AJAX function
function jQueryAjax(){
$.getJSON("data/MegaCities.geojson", callback);
};

//define callback function
function callback(response){
    //tasks using the data go here, otherwise they may not execute (remember example 3.3)
    console.log(response); //should log the geoJSON object to the console
};
//If I included console.log(response) here, it would throw an undefined error
$(document).ready(jQueryAjax);


//debug AJAX practice
//define main AJAX function to request the data
function debugAjax(){
//one of many available jQuery ajax methods - also, defining mydata to be used in callback function
	var mydata = $.ajax("data/MegaCities.geojson", {
//describe the data type and callback function
    dataType: "json",
		success: debugCallback
	}); //that's it! close the function
};
//define callback function
function debugCallback(mydata){
  //append the data as a string to my html <div>, so it shows up in the browser
	$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));
};
//run the function and its callback function once the document has loaded 
$(document).ready(debugAjax);
//if I try to append my data to my div outside of the callback, it won't work:
$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata)); //throws an undefined error
