//create an array of topics

var topics = ["happy", "yas queen", "enthusiastic", "yes", "dog"]

//render buttons 

function renderButtons() {
      
    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("topicButton");
        // Added a data-attribute
        a.attr("data-name", topics[i]);
        // Provided the initial button text
        a.text(topics[i]);
        // Added the button to the buttons-view div
        $("#buttonsHere").append(a);
    }
};

renderButtons();

$("button").on("click", function() {

    var theme = $(this).attr("data-name")

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theme + "&api_key=ItVZg7dqEEKwfl74bw0k4pld0Nswtx4h&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var themeDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].Rating);

          // Creating and storing an image tag
          var themeImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          themeImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the themeDiv
          themeDiv.append(p);
          themeDiv.append(themeImage);

          // Prependng the themeDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifsHere").prepend(themeDiv);
        };
    });


})