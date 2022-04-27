const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
		'X-RapidAPI-Key': '75782cec53msh272191a679e4c13p1ef88bjsn0d39f3ec32a8'
	}
};


var divEL = $("<div>").addClass("col-12 col-lg-8 row newDiv'");



 var createRecipes = function(choice){
     var tenRecipes = 8;

    fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${choice}`, options)
 	.then(function(response){
         return response.json();
     })

    .then(function(data){
         console.log(data);

       
    
        
            
    
         for(var i = 0 ; i < tenRecipes; i++){
             
             var newSmallDiv = $("<div>").addClass('col-2 newDiv');
                 newSmallDiv.addClass("white-line");
                 newSmallDiv.attr('style',`background-image:url(${data.hits[i].recipe.image});background-size:cover`);
                 divEL[0].append(newSmallDiv[0]);
                 console.log(data.hits[i].recipe.image);
                 

                 var h3El =$('<h3>').addClass('recipeH3');
                 h3El.text(`${data.hits[i].recipe.label}`);
                 newSmallDiv[0].append(h3El[0]);
                 
            
    
    
       }





    }) 
	
 	.catch(err => console.error(err));


  
     


 }


// listener for button click 
$('.topSection').click(function(event){
    var event = event.target;
    var searchRecipeBtn = $('#searchRec');
    var searchRecipeDiv = $('.youChooseDiv');
    var randomRecipeDiv = $('.randomDiv');
    
  
    
    if(event.id === searchRecipeBtn[0].id){
        searchRecipeDiv.removeClass("youChooseDiv col-12 col-lg-6 text-white white-line d-flex flex-column");
        searchRecipeDiv.addClass("youChooseDiv col-12 col-lg-4 text-white  d-flex flex-column");
        searchRecipeDiv.html(`
        <h2 class="getStartedH2 text-center">Search a recipe</h2>
        <div class="formDiv">
            <form id="user-form" class="searchRecForm d-flex flex-column">
                <input type="text" name="recipeSearch" id="recipeSearch" autofocus="true" placeholder="beef stew" class="form-input p-2 w-53" />
                <button type="submit" id="search" class="btn btn-info w-53 mt-3">Search</button>
                <button type="button" id="resetBtn" class="btn btn-info w-53 mt-3">Back to Home</button>
            </form>
        </div>`
        );
        
        randomRecipeDiv.remove();
        var newDiv = $('div[class="row-div row"]');
        
         newDiv.append(divEL[0]);
        
        


    }
})

createRecipes(`pad thai`);