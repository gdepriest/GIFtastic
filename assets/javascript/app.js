//create an array of topics

var topics = ["happy", "yas queen", "enthusiastic", "yes", "dog"]

//render buttons 

function renderButtons() {
    
    $("#buttonsHere").empty();
    
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



function displayGifs() {

    var theme = $(this).attr("data-name")

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theme + "&api_key=ItVZg7dqEEKwfl74bw0k4pld0Nswtx4h&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);
        
        var results = response.data;
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var themeDiv = $("<div>");

            //creating and displaying the paragraph with the rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
        var themeImageStill = results[i].images.fixed_height_still.url;
        var themeImageAnimated = results[i].images.fixed_height.url;

        var image = $("<img>");
            image.attr('src', themeImageStill);
            image.attr('data-still', themeImageStill);
            image.attr('data-animate', themeImageAnimated)
            image.attr('data-state', 'still');
            image.addClass("searchGif");


          // Appending the paragraph and image tag to the themeDiv
          themeDiv.append(p);
          themeDiv.append(image);

          // Prependng the themeDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifsHere").prepend(themeDiv);
        };
        
        
    });
};

$(document).on('click', '.searchGif', function() {
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$("#addTo").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#themeInput").val().trim();

    // Adding movie from the textbox to our array
    topics.push(topic);
    
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

  // Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", "button", displayGifs);

  // Calling the renderButtons function to display the intial buttons
renderButtons();
