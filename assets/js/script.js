const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
		'X-RapidAPI-Key': '75782cec53msh272191a679e4c13p1ef88bjsn0d39f3ec32a8'
	}
};






//Select the recipe results sections
var divEL = $("#recipeResults");
//var clickHandlerText = ".YouChooseDiv";

//Function to pull recipes from data base
var createRecipes = function(choice){
        // url for the recipe database
        var recipeApiUrl = `https://edamam-recipe-search.p.rapidapi.com/search?q=${choice}`;
        debugger;

        //Fetch call to database to find recipes based on query
        fetch(recipeApiUrl, options).then(function(response){
            return response.json()
        })
        .then(function(data){
          //console log the data options
            console.log(data);

            //setting variable for recipe length
            var tenRecipes = 8;
            divEL.html("");
            // loop through the data using the desired length
            for(var i = 0 ; i < tenRecipes; i++){
             
            //create a new div element to hold the pictures from the recipes
             var newSmallDiv = $("<div>").addClass('column is-one-fifth newDiv');
                //take the new div and set its background image to the picture of the food and cover the full div.
                 newSmallDiv.attr('style',`background-image:url(${data.hits[i].recipe.image})`);
                 //append food imaged div to div container element
                 divEL.append(newSmallDiv[0]);

                 // divel might need [0]
                 
                 
                //create an h3 element and set a class to element
                 var h3El =$('<h3>').addClass('recipeH3');
                 // set the text of h2 to the recipe label
                 h3El.text(`${data.hits[i].recipe.label}`);
                 //append to photo div
                 newSmallDiv[0].append(h3El[0]);
}
}) 

	// if there is an error with query catch it and console log
 	.catch(err => console.error(err));
}

//event listener function for form field
$(`#user-form`).submit(function(event){
    
    //get the value from the search field
    var recipeText = $('#recipeSearch').val();
    //takes value and starts search function
    console.log(recipeText);
    event.preventDefault();
    return createRecipes(`${recipeText}`);
    //recipeText = "";
})  

console.log($("#user-form"));

// // listener for button click adds code for search field
// $('#heroSectionContainer').click(function(event){
//     // set event target to variable
//     var event = event.target;
   
//     // if the event id equal to #searchRecBtn
//     if(event.id === "searchRecBtn"){
//     // Clear out any html elements in the divEL
//         divEL.html("");
//     }
//         clickHandlerText = "#user-form";

//         });
        






