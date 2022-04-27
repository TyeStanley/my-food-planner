const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
		'X-RapidAPI-Key': '75782cec53msh272191a679e4c13p1ef88bjsn0d39f3ec32a8'
	}
};


var divEL = $("<div>").addClass("col-12 col-lg-8 row newDiv'");



 var createRecipes = function(choice){
     var tenRecipes = 6;

    fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${choice}`, options)
 	.then(function(response){
         return response.json();
     })

    .then(function(data){
         console.log(data);

       
    
        
    
    
         for(var i = 0 ; i < tenRecipes; i++){
             
             var newSmallDiv = $("<div>").addClass('col-3 newDiv');
                 newSmallDiv.attr('style',`background-image:url(${data.hits[i].recipe.image})`);
                 divEL[0].append(newSmallDiv[0]);
                 console.log(data.hits[i].recipe.image);
                 
                 
            
    
    
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
        
        randomRecipeDiv.remove();
        
        
         $('div[class="row-div row"]').append(divEL[0]);
        


    }
})

createRecipes(`healthy meals`);