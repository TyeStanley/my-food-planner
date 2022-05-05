const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
		'X-RapidAPI-Key': 'eb43b08f3fmsh10848c7bb34f19cp12b721jsncaced0890350'
	}
};

//Select the recipe results sections
var divEL = $("#recipeResults");
var currentData;
var recipeIngredients=[""];
var currentSave;
var email;
var titleArray;
var weeklyRecipes;

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
  $(".groceryList").append(`<br><h4>${title} Ingredients:</h4></br> <ul class="li${i}">`);
  for(var i = 0; ingredients.length > i; i++){
    var ingr = droppedOn[0].parentNode.childNodes[3].childNodes[3].childNodes[1];
    // create an array of ingredients
    recipeIngredients.push(ingredients[i].text);
    // append ingredent list to the element its dropped on
    $(droppedOn[0].parentNode.childNodes[3].childNodes[3].childNodes[1]).append(`<li class="cardListEl">${recipeIngredients[i + 1]}</li>`);
      // appends ingredients to current list heading
    $(`.li${currentI}`).append(`<li>${recipeIngredients[i+1]}</li>`);
    

    
  }
  $(`.li${currentI}`).removeAttr("class")
  
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

// function to save to local storage
var saveToStorage = function(currentSave){
    // takes the current state of the daysOfWeek section and saves it to local storage
     localStorage.setItem('currentDiv', currentSave );

}

// function to load local storage
var loadSave = function(){
  // search local storage for currentDiv key
  var getItem = localStorage.getItem('currentDiv');
  // if there is content then select the main container and set it to that 
  if(getItem){
    $('#dayOfWeekContainer')[0].outerHTML = getItem;
  }
}


var textToEmail = function() {

  email = email.trim();
  
    
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': 'easymail.p.rapidapi.com',
      'X-RapidAPI-Key': 'eb43b08f3fmsh10848c7bb34f19cp12b721jsncaced0890350'
    },
    body: `{"from":"Your Weekly Recipes Are Here","to":"${email}","subject":"Here is your Grocery List : ","message":"${weeklyRecipes}"}`
  };
  
  fetch('https://easymail.p.rapidapi.com/send', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    $('.modal').removeClass("is-active is-clipped");
    $('#emailInput').val("");
}


  // listen for a submit from email form
  $("#emailForm").submit(function(event){
    
    // if there is a submit grab the email value from input field and save it
   email = $('#emailInput').val();
   // call text to email function with recipe and email 
   // prevent page refresh
   
    textToEmail();
    event.preventDefault(); 
  })
  

// if the X is clicked close modal
$('.modal-close').click(function(){
  $('.modal').removeClass("is-active is-clipped");

})



// listern for the grocery list buttons div 
$(".grocBtns").click(function(event){
  
  // sets the event target to var 
  var event = event.target;
  // checks to see if the event contains the minimizeBTN class list
  var miniBtn = event.classList.contains('minBtn');
  //checks to see if the event contains the event has clearListItem class 
  var removeItemBtn = event.classList.contains('clearListItem');
  // checks to see if the event contains the emailBtn Class
  var emailBtn = event.classList.contains("emailBtn");
 
  // if it is the minBtn then use slide toggle
  if(miniBtn){
      $(".groceryContent").slideToggle();
      
      if($('#minimized')[0].classList.contains("invisible")){
        $('#minimized').removeClass("invisible").addClass('visible');
      } 
      else{
        $('#minimized').removeClass("visible").addClass('invisible');
      }
  }
  else if(removeItemBtn){
    localStorage.removeItem('currentDiv');
    location.reload();
    
  }
  else if(emailBtn){
    $('.modal').addClass("is-active is-clipped");
    
    // Gets the list in the form of HTML from grocery list
     weeklyRecipes = $('.groceryList')[0].innerHTML;

   
    
  }
  else{
    return;
  }
  



 
});



loadSave();

(function() {
  const form = document.getElementById('info-form');
  const results = document.getElementById('results');
  const errors = document.getElementById('form-error');

  /* Returns false if form is blank*/
  function errorMessage(message) {
    errors.innerHTML = message;
    errors.style.display = '';
    return false
  };

  /* Calculate the daily calories */
  function calculateResults(calories) {
    results.innerHTML = '<p>Basal metabolic rate (BMR):' + Math.round(calories) + ' calories a day.</p><a href="#" id="gb">go back</a>';
    results.style.display = ''
    form.style.display = 'none'
  };

  /* Go from result to form */
  function goBack(event) {
    if(event.target.id = "gb") {
      event.preventDefault();
      results.style.display = 'none';
      form.style.display = '';
      form.reset();
    };
  };
  /* Handle submit */
  function submitHandler(event) {
    event.preventDefault();

    /* Age */
    let age = parseFloat(form.age.value);
    if (isNaN(age) || age < 0) {
      return errorMessage('Please enter an age');
    };

    let heigthCM = parseFloat(form.height_cm.value);
    if (isNaN(heigthCM) || heigthCM < 0) {
      let heightFeet = parseFloat(form.height_ft.value);
      if (isNaN(heightFeet) || heightFeet < 0) {
        return errorMessage('Please enter valid height');
      }
      let heightIn = parseFloat(form.height_in.value);
      if (isNaN(heightIn) || heightIn < 0) {
        heightIn = 0;
      }
      heigthCM = (2.54 * heightIn) + (30.4 * heightFeet)
    }

    let weight = parseFloat(form.weight.value);
    if (isNaN(weight) || weight < 0) {
      return errorMessage('Please enter a weight');
    }

    if (form.weight_unit.value == 'lb') {
      weight = 0.4536 * weight;
    }

    let calories = 0;
    if (form.gender.value == 'Female') {

      calories = 655.09 + (9.56 * weight) + (1.84 * heigthCM) - (4.67 * age);
    } else {
      calories = 66.47 + (13.75 * weight) + (5 * heigthCM) - (6.75 * age)
    };

    calculateResults(calories);
  };
  form.addEventListener('submit', submitHandler);
  results.addEventListener('click', goBack, true);
})();