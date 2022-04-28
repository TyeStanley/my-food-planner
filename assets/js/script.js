const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
		'X-RapidAPI-Key': '75782cec53msh272191a679e4c13p1ef88bjsn0d39f3ec32a8'
	}
};





// creating a new div to house the pictures of food in 
var divEL = $("<div>").addClass("col-12 col-lg-9 row newDiv'");
var clickHandlerText = ".YouChooseDiv";
var dataVar = {};
var currentBackgroundImage = ``;

    //Function to pull recipes from data base
    var createRecipes = function(choice){
        

        // url for the recipe database
        var recipeApiUrl = `https://edamam-recipe-search.p.rapidapi.com/search?q=${choice}`;

        //Fetch call to database to find recipes based on query
        fetch(recipeApiUrl, options)

        //if there is a response from database convert it to json
 	    .then(function(response){
            //return json verison of response to data
            return response.json();
        })
        //if there is data then
        .then(function(data){
            //console log the data options
            
            dataVar = data;

            //setting variable for recipe length
            var tenRecipes = 9;
            divEL.html("");
            // loop through the data using the desired length
            for(var i = 0 ; i < tenRecipes; i++){
             
            //create a new div element to hold the pictures from the recipes
             var newSmallDiv = $("<div>").addClass('col-3 newDiv');
                //add a draggable id
                newSmallDiv.attr("id", "draggable");
                newSmallDiv.attr("data", `style${i}`);
                //take the new div and set its background image to the picture of the food and cover the full div.
                 newSmallDiv.attr('style',`background-image:url(${data.hits[i].recipe.image});background-size:cover`);
                 //append food imaged div to div container element
                 divEL[0].append(newSmallDiv[0]);
                 
                 
                //create an h3 element and set a class to element
                 var h3El =$('<h3>').addClass('recipeH3');
                 // set the text of h2 to the recipe label
                 h3El.text(`${data.hits[i].recipe.label}`);
                 //append to photo div
                 newSmallDiv[0].append(h3El[0]);
}
return draggableUnit();
}) 
	// if there is an error with query catch it and console log
 	.catch(err => console.error(err));
}










//event listener function for form field
var starteventListener = function(){
  // listen for the click on the search form button
  $(`${clickHandlerText}`).submit(function(event){
  //get the value from the search field
  var recipeText = $('#recipeSearch').val();
  //takes value and starts search function
  createRecipes(`${recipeText}`);
  recipeText = "";
  



})  

}

// listener for button click adds code for search field
$('.topSection').click(function(event){
    // set event target to variable
    var event = event.target;
    // selecting the div that holds the you choose recipe options
    var searchRecipeDiv = $('.youChooseDiv');
    //select the random select div container
    var randomRecipeDiv = $('.randomDiv');
    
    console.log(event.className);
  
    // if the event id equal to #searchRecBtn
    if(event.id === "searchRecBtn"){
        // remove the class from the you choose div container
        searchRecipeDiv.removeClass("youChooseDiv col-12 col-lg-6 text-white white-line d-flex flex-column");
        // add a new class that adjust the coloum of you choose container
        searchRecipeDiv.addClass("youChooseDiv col-12 col-lg-3 text-white  d-flex flex-column");
        // set html that creates new form field and search and back to home buttons    
        searchRecipeDiv.html(`
        <h2 class="getStartedH2 text-center">Search a recipe</h2>
        <div class="formDiv">
            <form onsubmit='return false;' id="user-form" class="searchRecForm d-flex flex-column">
                <input type="text" name="recipeSearch" id="recipeSearch" autofocus="true" placeholder="beef stew" class="form-input p-2 w-53" />
                <button type="submit" id="search" class="btn btn-info w-53 mt-3">Search</button>
                <button type="button" id="resetBtn" class="btn btn-info w-53 mt-3">Back to Home</button>
            </form>
        </div>`
        );
        clickHandlerText = "#user-form";
        
        
        //remove random selecion div
        randomRecipeDiv.remove();

        
        // select row div container holder the two search fields
        var newDiv = $('div[class="row-div row"]');
        //append the div that houses pictures to the two classes 
         newDiv.append(divEL[0]);
        // starts new event listener function
        return starteventListener();

        }
    else if(event.className === "col-3 newDiv ui-draggable ui-draggable-handle"){
      currentBackgroundImage = event.style.backgroundImage;
      console.log(currentBackgroundImage);
    }
        
    
    });

  
    var draggableUnit = function(){
  
 
  
      $( ".newDiv" ).draggable();
      $( ".droppable" ).droppable({
        drop: function( event, ui ) {
          
          
          
          console.log( currentBackgroundImage);
          
          $( this )

            .css("background-image", `${currentBackgroundImage}`)
            
            .css("background-size","cover")
    
            $(".newDiv").remove();
        }
            
              
      });
    
            
          
    
    };