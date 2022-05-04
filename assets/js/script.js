const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
		'X-RapidAPI-Key': '75782cec53msh272191a679e4c13p1ef88bjsn0d39f3ec32a8'
	}
};

//Select the recipe results sections
var divEL = $("#recipeResults");
var currentData;
var recipeIngredients=[""];
var currentSave;
var email;


// Drag and drop function
var draggableUnit = function(){
  $( ".newDiv" ).draggable({
    helper: "clone",
    scroll: true,
    scrollSensitivity: 100,
    scrollSpeed: 25,
    snap: true ,
    zIndex: 2000,
    appendTo: "#dayOfWeekSec"

    

  });
  $( ".droppable" ).droppable({
    drop: function( event, ui ) {
        var dropped = ui.draggable;
        var i = dropped[0].attributes[3].textContent;
        var droppedOn = $(this);
        $(droppedOn).html("");
        $(dropped).detach().removeClass("column is-one-fifth newDiv ui-draggable ui-droppable").addClass("image is-4by3 figureImg").appendTo(droppedOn);
        $('.recipeH3').addClass("recipeH3Active");
      $( this )
        
      
        $('.recipeH3').addClass("recipeH3Active");
        // adds recipe link dynamicly to the card dropped on
        $(droppedOn[0].parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3].childNodes[0]).attr({href : `${currentData.hits[i].recipe.url}`,
                                                                                                               target: "_blank" 
        });
        findIngredients(i, droppedOn);
        console.log(droppedOn[0].parentElement);
        $(droppedOn[0].parentElement).removeClass('btnSnap').addClass("dayOfWeekCard");
        currentSave = droppedOn[0].parentNode.parentElement.outerHTML;
        saveToStorage(currentSave);
        
        
        $(".newDiv").remove();
    }
    
  });

};

var findIngredients = function(i, droppedOn){
  recipeIngredients = [""];
  var ingredients = currentData.hits[i].recipe.ingredients;
  var title  = currentData.hits[i].recipe.label
  var currentI = i;
  $(".groceryList").append(`<li class="groceryListTitle">Ingredients for: ${title}<ul class="li${i}"></ul></li>`);
  for(var i = 0; ingredients.length > i; i++){
    var ingr = droppedOn[0].parentNode.childNodes[3].childNodes[3].childNodes[1];
    // create an array of ingredients
    recipeIngredients.push(ingredients[i].text);
    $(droppedOn[0].parentNode.childNodes[3].childNodes[3].childNodes[1]).append(`<li class="cardListEl">${recipeIngredients[i + 1]}</li>`);
      
    $(`.li${currentI}`).append(`<li>${recipeIngredients[i+1]}</li>`);

    
  }

  
}
//Function to pull recipes from data base
var createRecipes = function(choice){
        // url for the recipe database
        var recipeApiUrl = `https://edamam-recipe-search.p.rapidapi.com/search?q=${choice}`;
        

        //Fetch call to database to find recipes based on query
        fetch(recipeApiUrl, options).then(function(response){
            return response.json()
        })
        .then(function(data){
          //console log the data options
            //console.log(data);
            currentData = data;

            //setting variable for recipe length
            var tenRecipes = 8;
            divEL.html("");
            
            // loop through the data using the desired length
            for(var i = 0 ; i < tenRecipes; i++){
             
            //create a new div element to hold the pictures from the recipes
             var newSmallDiv = $("<figure>").addClass('column is-one-fifth newDiv image');
                 newSmallDiv.attr("id", "draggable");
                //take the new div and set its background image to the picture of the food and cover the full div.
                 newSmallDiv.attr('style',`background-image:url(${data.hits[i].recipe.image})`);
                 newSmallDiv.attr('data',`${i}`);
                 //append food imaged div to div container element
                 divEL.append(newSmallDiv[0]);
                //create an h3 element and set a class to element
                 var h3El =$('<h3>').addClass('recipeH3');
                 // set the text of h2 to the recipe label
                 h3El.text(`${data.hits[i].recipe.label}`);
                 //append to photo div
                 newSmallDiv[0].append(h3El[0]);
}
$('#recipeSearch').val("");
  return draggableUnit();   
}) 

	// if there is an error with query catch it and console log
 	.catch(err => console.error(err));
}

//event listener function for form field
$(`#user-form`).submit(function(event){
    
    //get the value from the search field
    var recipeText = $('#recipeSearch').val();
    //takes value and starts search function
    createRecipes(`${recipeText}`);
    event.preventDefault();  
}) 
var currentDay;
// LISTENER FOR CLICKS IN CARD SECTION 
$(`#dayOfWeekSec`).click(function(event){
  // event target variable
  var event = event.target;
  // day of week class buttons
  var dayOfWeekBtns = event.classList.contains('daysBtns');

  
// if dat of the week button is selected and the event id isn't == to the previous one
  if(dayOfWeekBtns   && event.id != currentDay){
   // select the card element with the same id and bring it up to the top
    $(`div[data-day=${event.id}]`).removeClass('dayOfWeekCard').addClass("btnSnap");
    return  currentDay = event.id;
  }
//return element back to location
  else if(dayOfWeekBtns){ $(`div[data-day="${event.id}"]`).removeClass('btnSnap').addClass("dayOfWeekCard");
        return currentDay = "";
}
  else{
    return;
}
  
})


// TOUCH SCREEN CONTROLLS SO DRAG AND DROP WORKS
function touchHandler(event) {
  var touch = event.changedTouches[0];

  var simulatedEvent = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent({
      touchstart: "mousedown",
      touchmove: "mousemove",
      touchend: "mouseup"
  }[event.type], true, true, window, 1,
      touch.screenX, touch.screenY,
      touch.clientX, touch.clientY, false,
      false, false, false, 0, null);

  touch.target.dispatchEvent(simulatedEvent);
  event.preventDefault();
}

function init() {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);
}

var saveToStorage = function(currentSave){

     localStorage.setItem('currentDiv', currentSave );

}

var loadSave = function(){
  var getItem = localStorage.getItem('currentDiv');
    
  if(getItem){
    $('#dayOfWeekContainer')[0].outerHTML = getItem;
  }
}


var textToEmail = function(weeklyRecipes) {

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': 'easymail.p.rapidapi.com',
      'X-RapidAPI-Key': '75782cec53msh272191a679e4c13p1ef88bjsn0d39f3ec32a8'
    },                                                                                        //${weeklyRecipes}
    body: `{"from":"Example","to":"heierms@gmail.com","subject":"This is the mail subject","message":"<li>2 tbsp. chili powder</li><li>1 tbsp. cayenne</li><li>1 8-10-lb. beef brisket</li><li>1 cup apple juice</li></ul>"}`
  };
  
  fetch('https://easymail.p.rapidapi.com/send', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

      

  
}

$(".grocBtns").click(function(event){
  var event = event.target;
  var miniBtn = event.classList.contains('minBtn');
  var removeItemBtn = event.classList.contains('clearListItem');
  var emailBtn = event.classList.contains("emailBtn");
 
  if(miniBtn){
      $(".groceryList").slideToggle();
      console.log("min");
  }
  else if(removeItemBtn){
    console.log("remove");

  }
  else if(emailBtn){
    
    var weeklyRecipes = $('.groceryList')[0].childNodes[0].innerHTML;
    // get this class from dom 
    var titleArray = weeklyRecipes.split("<ul class=\"li4\">");
    console.log(titleArray);
    weeklyRecipes = titleArray[1];
    
    //textToEmail(weeklyRecipes);
    
    // var arrayIng = titleArray[1].split(".");
    // var recTitle = `Your ${titleArray[0]} ${arrayIng[0]} are:\n`;

  //  for(var i = 1; i < arrayIng.length; ++i){

      
  //     weeklyRecipes += "\n" + arrayIng[i];
       console.log(titleArray);



 
  //   }
    

  }
  else{
    return;
  }
  



 
});


//textToEmail();
loadSave();