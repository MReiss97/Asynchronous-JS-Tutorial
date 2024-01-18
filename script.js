// Variable to keep track of the page number for fetching data
var pageCounter = 1;

// Get the container element for displaying animal information
var animalContainer = document.getElementById("animal-info");

// Get the button element for triggering data fetching
var btn = document.getElementById("btn");

// Add a click event listener to the button
btn.addEventListener("click", function() {
  // Create a new XMLHttpRequest object
  var ourRequest = new XMLHttpRequest();

  // Construct the URL for fetching JSON data based on the page counter
  ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

  // Define what to do when the request is successful
  ourRequest.onload = function() {
    // Check if the response status is in the success range (200-399)
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      // Parse the JSON response
      var ourData = JSON.parse(ourRequest.responseText);

      // Call a function to render the HTML using the retrieved data
      renderHTML(ourData);
    } else {
      // Log an error message if the server returns an error
      console.log("We connected to the server, but it returned an error.");
    }
  };

  // Define what to do in case of a connection error
  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  // Send the request to the server
  ourRequest.send();

  // Increment the page counter for the next request
  pageCounter++;

  // Hide the button if the page counter is greater than 3
  if (pageCounter > 3) {
    btn.classList.add("hide-me");
  }
});

// Function to render HTML based on the received data
function renderHTML(data) {
  var htmlString = "";

  // Loop through the data array
  for (i = 0; i < data.length; i++) {
    // Build a string with information about each animal
    htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";
    
    // Loop through the 'likes' array for each animal
    for (ii = 0; ii < data[i].foods.likes.length; ii++) {
      // Add each liked food to the string
      if (ii == 0) {
        htmlString += data[i].foods.likes[ii];
      } else {
        htmlString += " and " + data[i].foods.likes[ii];
      }
    }

    htmlString += ' and dislikes ';

    // Loop through the 'dislikes' array for each animal
    for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
      // Add each disliked food to the string
      if (ii == 0) {
        htmlString += data[i].foods.dislikes[ii];
      } else {
        htmlString += " and " + data[i].foods.dislikes[ii];
      }
    }

    htmlString += '.</p>';
  }

  // Insert the generated HTML string into the animal container
  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}