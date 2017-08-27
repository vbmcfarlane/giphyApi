  $(document).ready(function() {
    // Hide messages
     $('#fail').hide();
     $('#warning').hide();
     // Initial array of animals
      var animals = ["animals", "cars", "weddings", "dance","swimming","karate","wrestling","birds"];

      // displayanimalInfo function re-renders the HTML to display the appropriate content
      function displayanimalInfo() {

      var animal = $(this).attr("data-name");
     
    // var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&limit=10&search?q="+ animal;
       
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

                
       
        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          //removes previously populated divs of animal gifs to prep for load on page
         $( "div" ).remove( ".imgState" );
         // loads new pics into the page
          var results = response.data;
          console.log("number of records = " + results.length);
        // loops through the API data pulled in   

        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div class='imgState'>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing still and animated images
            var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url)
          
            // Appending the paragraph and image tag to the animalDiv
          
            animalDiv.append(animalImage);
            animalDiv.append(p);
        
             $("#animals-view").append(animalDiv);
          }   

        });

      }

      // Function for displaying animal buttons
      function renderButtons() {

        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
       
        $("#buttons-view").empty();

        //sort array of animals alphabetically ascending
         animals.sort();
      //  animals.sort(function(a, b){return b-a});
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a animal button is clicked
      $("#add-animal").on("click", function(event) {

            event.preventDefault();

            // This line grabs the input from the textbox
            var animal = $("#animal-input").val().trim();
            console.log("animal = " + animal)
             //checks for no input value submitted
            if (animal == '')   {
                $('#warning').fadeIn(1000).delay(3000).fadeOut(1000);
            } 
            // Check for duplicate button values. doesn't run existing buttons
            else if(jQuery.inArray(animal, animals) !== -1){
                  // alert(animal +" is in array, enter a different animal name");
                   $('#fail').fadeIn(1000).delay(3000).fadeOut(1000);
                   //Clears the input window
                    $("#animal-input").val('');
            } else {
                     // Adding animal from the textbox to our array
                      animals.push(animal);

                    // Calling renderButtons which handles the processing of our animal array
                    renderButtons();
                    // Clears the input window
                    $("#animal-input").val('');
            } 
      });

      $(document).on("click", "img", function() {
              if ($(this).attr("src") != $(this).attr("data-animate")) {
                $(this).attr("src", $(this).attr("data-animate"));
              } else {
                $(this).attr("src", $(this).attr("data-still"));
              }
  })

      // Adding a click event listener to all elements with a class of "animal"
      $(document).on("click", ".animal", displayanimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


 });
    