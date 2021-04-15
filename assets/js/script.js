//***************************
//GLOBAL VARIABLES
//***************************
//cocktail
let spirit = "";
let drinkName= "";
let drinkId = "";
 //Getting age of the user and setting the user selections
 setTimeout(function(){
  if(!localStorage.getItem('Yes')){
   $(".modal").addClass("is-active")
  }
},1000);
$("#yes").on("click",function(){
 
 localStorage.setItem('Yes',true);
 
$(".modal").removeClass("is-active")   
})
$("#no").on("click",function(){
   $(".text").html("Sorry you should be 21 to enter this page.");

})

//trivia global variables
var startTriviaBtn = document.getElementById("start") //initial screen start trivia game button
var triviaEl = document.getElementById("trivia"); //set var to trivia container
var introEl = document.getElementById("intro"); //set var to text field for displaying intro question
var answerTrue; //global var for true button
var answerFalse; //global var for false button
var questionsEl=document.getElementById("questions"); //set var to text field for displaying questions
var questionAmount; //for the amount of questions user wants in game
var triviaQuestion; //for setting the API array as var
var triviaAnswer; //for the correct answer provided from API
var triviaIndex = 0; //for the position in array
var answerFeedback = document.getElementById("answerFeedback"); //for setting the answerFeedback field as var to display feedback on users answer to question
var currentScore = document.getElementById("currentScore"); //for setting the text on the page for the current score
var apiResults; 
var score =0 ;
function reset(){
    score=0;
    triviaIndex=0;
}
//var questionArrayLength = document.getElementById("triviaLength"); //var to pass through url on count of trivia questions
var questionArrayLength = 10; //default question trivia length
var timer =1;//timer for allowing feedback to be displayed for user to see correct vs incorrect response
//var triviaDifficultyEl = document.getElementById("triviaDifficulty");
var triviaCategoryEl = document.getElementById("triviaCategory");
var triviaStartQuestionsEL = document.getElementById("trivia-start-questions");
var triviaDifficultyDropDown; 
var triviaCategoryDropDown;


//***************************
//START OF TRIVIA
//***************************
function startTrivia() {
    //reset index start and score to 0
    reset();

    //clear text fields for replay
    startTriviaBtn.style.display="none";
    questionsEl.innerHTML="";
    answerFeedback.innerHTML="";
    introEl.innerHTML="";
    currentScore.innerHTML="";

    //create category button
    var triviaCategoryDropDown=document.createElement("button");
    triviaCategoryDropDown.id="dropbtn";
    triviaCategoryDropDown.textContent="Category";
    triviaCategoryDropDown.className="dropbtn";
    triviaCategoryEl.appendChild(triviaCategoryDropDown);

    //check dropdown selected from category button
    $("#9").click(function(){
      triviaCategoryDropDown.innerHTML="General Knowledge"
      triviaCategoryDropDown.id="9"
    });

    $("#21").click(function(){
      triviaCategoryDropDown.innerHTML="Sports"
      triviaCategoryDropDown.id="21"
    });

    $("#23").click(function(){
      triviaCategoryDropDown.innerHTML="History"
      triviaCategoryDropDown.id="23"
    });

    $("#14").click(function(){
      triviaCategoryDropDown.innerHTML="Entertainment: Television"
      triviaCategoryDropDown.id="14"
    });

    //create submit button
    var triviaVarSubmit = document.createElement("button");
    triviaVarSubmit.id="trivia-submit";
    triviaVarSubmit.textContent="submit";
    triviaVarSubmit.className="dropbtn"
    triviaStartQuestionsEL.appendChild(triviaVarSubmit);

    //check that user picked a category and difficulty
    triviaVarSubmit.addEventListener("click", function () {


      if (triviaCategoryDropDown.innerHTML==="Category" ){
        //nothing happens if both buttons aren't modified
      }
      else {
        
        fetch(`https://opentdb.com/api.php?amount=10&category=${triviaCategoryDropDown.id}&type=boolean`).then(function (response) {
          console.log(response);
          return response.json();
          })
          .then(function(response){
              console.log(response.results[triviaIndex])
              console.log(response.results);
              apiResults=response.results;
              console.log(triviaAnswer)
              resultLoop();
          });
        triviaVarSubmit.parentElement.removeChild(triviaVarSubmit)
        triviaCategoryDropDown.parentElement.removeChild(triviaCategoryDropDown)
        //triviaDifficultyDropDown.parentElement.removeChild(triviaDifficultyDropDown)
          gameBegin();
        
      }
    })

};

function gameBegin(){
        //add question   
                
        //add true button    
        var answerTrue = document.createElement("button");
        answerTrue.id = "trueBtn";
        answerTrue.textContent = "True";
        triviaEl.appendChild(answerTrue);
        //add false button
        var answerFalse = document.createElement("button");
        answerFalse.id = "falseBtn";
        answerFalse.textContent = "False";
        triviaEl.appendChild(answerFalse);
    
        checkAnswer();
}

function countDown(){
    var timeInterval = setInterval(function() {
        if (timer>0){
            timer--
        }
        else if(timer===0){
            clearInterval(timeInterval);
            answerFeedback.innerHTML=''
            resultLoop();
        }
    },600);            
}

function resultLoop(){
    console.log("trivia index: "+triviaIndex);
        console.log("question length: " +questionArrayLength);
    if(triviaIndex===questionArrayLength){
        gameResults();
    }else{
    triviaAnswer=apiResults[triviaIndex].correct_answer;
    triviaQuestion=apiResults[triviaIndex].question;
    questionsEl.innerHTML=triviaQuestion
    }
}

function checkAnswer(){
    document.getElementById("trueBtn").onclick = function() {
        console.log("True button clicked");
        if(triviaAnswer==="True"){
            score += 10;
            currentScore.innerHTML="Current Score: " + score;
            answerFeedback.innerHTML="That's Correct!"
            triviaIndex++;
            console.log(score);
            //add 2 seconds delay for reading response then clear text and go to next question
            countDown();
            }
            else{
                answerFeedback.innerHTML="Incorrect";
                triviaIndex++;
                console.log(score);
                countDown();
            }
        }
    document.getElementById("falseBtn").onclick = function() {
        console.log("False button clicked");
        if(triviaAnswer==="False"){
            score += 10;
            currentScore.innerHTML="Current Score: " + score;
            answerFeedback.innerHTML="That's Correct!"
            triviaIndex++;
            console.log(score);
            //add 2 seconds delay for reading response then clear text and go to next question
            countDown();
            }   
            else {
            answerFeedback.innerHTML="Incorrect";
            triviaIndex++;
            console.log(score);
            //add 2 seconds delay for reading response then clear text and go to next question
            countDown();
            }
        }
    }

    
    
    $("#trueBtn").click(function() {
        var that = this;
        $(this).attr("disabled", true);
        setTimeout(function() { enableSubmit(that) }, 1000);
    });
   
   function gameResults(){
    falseBtn.innerHTML="I'm Done";
    trueBtn.innerHTML="Play Again"
    answerFeedback.innerHTML='';
    questionsEl.innerHTML = "Good effort! You answered all of the questions";
    //check local storage for a new high score
    if(localStorage.getItem("highScore")===null){
        localStorage.setItem("highScore", score)
        answerFeedback.innerHTML="Congratulations! You have set a new high score!"
    }
    else if(score>localStorage.getItem("highScore")){
        localStorage.setItem("highScore", score);
        answerFeedback.innerHTML = "Congratulations! You have set a new high score!"
    }
    else {
        answerFeedback.innerHTML = "You didn't set a new high score. Better luck next time!"
    }
    //function for user playing another round
    document.getElementById("trueBtn").onclick = function(){
        trueBtn.parentNode.removeChild(trueBtn);
        falseBtn.parentNode.removeChild(falseBtn);
        startTrivia();
    }
    //function for user being done playing game
    document.getElementById("falseBtn").onclick = function(){
        introEl.innerHTML='Are you ready for a challenge?'
        questionsEl.innerHTML='';
        answerFeedback.innerHTML=''
        currentScore.innerHTML=''
        trueBtn.parentNode.removeChild(trueBtn);
        falseBtn.parentNode.removeChild(falseBtn);
        document.getElementById("start").style.display="block";
    }
   }

startTriviaBtn.addEventListener("click", startTrivia);

//***************************
//COCKTAIL DB API
//***************************


//BUTTON CLICK LISTENERS
$("#bourbon").click(function(){
  spirit = "Bourbon";
  console.log("CHOSEN SPIRIT IS: " + spirit);
  generateCocktail(spirit);
  selectPlaylist(spirit);
});

$("#rum").click(function(){
  spirit = "Rum";
  console.log("CHOSEN SPIRIT IS: " + spirit);
  generateCocktail(spirit);
  selectPlaylist(spirit);
});

$("#vodka").click(function(){
  spirit = "Vodka";
  console.log("CHOSEN SPIRIT IS: " + spirit);
  generateCocktail(spirit);
  selectPlaylist(spirit);
});

$("#gin").click(function(){
  spirit = "Gin";
  console.log("CHOSEN SPIRIT IS: " + spirit);
  generateCocktail(spirit);
  selectPlaylist(spirit);
});

$("#tequila").click(function(){
  spirit = "Tequila";
  console.log("CHOSEN SPIRIT IS: " + spirit);
  generateCocktail(spirit);
  selectPlaylist(spirit);
});



//GENERATE COCKTAIL FUNCTION
function generateCocktail(spirit){
	fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + spirit)
  .then(
    //NONRESPONSE CONSOLE WARNING
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      //ACTUAL BODY OF FUNCTION
      response.json().then(function(data) {

        let drinkInteger = Math.floor(Math.random() * data.drinks.length);

        let drinkName = data.drinks[drinkInteger].strDrink;
        let drinkId = data.drinks[drinkInteger].idDrink;
        let cocktailName = drinkName + 'Cocktail'
        // console.log("DRINK NAME: " + drinkName);
        // console.log("DRINK ID: " + drinkId);
        appendCocktail(drinkId, drinkName);
        console.log("Drink name is: " + drinkName + " with ID of: " + drinkId);
        // Getting youtube video with cocktail name and finding the videoId;
        return fetch ('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDODhnbSK7cWXu8d5iAbpRpsdHRFLfFfJM&type=video&part=snippet&maxResults=1&q='+ cocktailName)
        
      }).then(function(response){
        response.json().then(function(data){
          // assignin videoId and embed it to html
            var youtubeSearch =data.items[0].id.videoId
            console.log(youtubeSearch);
            
            document.getElementById("video").src = `https://youtube.com/embed/${youtubeSearch}`
        })
            
        })
      
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

//PULL APPROPRIATE COCKTAIL PAGE AND APPEND TO BODY
function appendCocktail(drinkId){
	fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId)
  .then(
    //NONRESPONSE CONSOLE WARNING
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      //ACTUAL BODY OF FUNCTION
      response.json().then(function(data) {
        console.log("Drink with ID of " + drinkId + " and name of " + drinkName + " were called by appendCocktail function")
        
        console.log(data);
        console.log(data.drinks[0].strDrink);

        let drinkSection = document.querySelector('#drink-section');
        
        document.getElementById('drink-section').innerHTML = "";

        let drinkInfo = document.createElement('h4');
        drinkInfo.classList.add("py-1");
        drinkInfo.classList.add("is-size-4");
        drinkInfo.innerHTML = data.drinks[0].strDrink;

        drinkSection.appendChild(drinkInfo);

        let img = document.createElement('img');
        img.src = data.drinks[0].strDrinkThumb;
        img.classList.add("py-2")

        drinkSection.appendChild(img);

        for(let i=1; i<16; i++){
          let ingredient = document.createElement('li');
          ingredient.innerHTML = data.drinks[0][`strMeasure${i}`] + " " + data.drinks[0][`strIngredient${i}`];
      
          drinkSection.appendChild(ingredient);
          if(data.drinks[0][`strMeasure${i + 1}` ] === null) {
            let description = document.createElement("p");
            description.innerHTML = data.drinks[0].strInstructions;
            description.classList.add("pt-3");
            drinkSection.appendChild(description);
            return;
          }
        }
        let instruction = document.createElement('li');
        instruction.innerHTML = data.drinks[0].strInstructions;

        console.log(instruction);

        drinkSection.appendChild(instruction);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

//***************************
//SPOTIFY
//***************************

function selectPlaylist(spirit) {
  let openingUrl = "https://open.spotify.com/embed/playlist/";
  let i = Math.floor(Math.random() * 3);
  console.log(i);
  let randomUrl = [];
  let playlistUrl = ""
  if (spirit === "Bourbon") {
    randomUrl = [
      "37i9dQZF1DX3Fzl4v4w9Zp",
      "37i9dQZF1DX2taNm7KfjOX",
      "37i9dQZF1DXat5j4Lk8UEj"
    ]
    playlistUrl = randomUrl[i];
  };
  if (spirit === "Rum") {
    randomUrl = [
      "37i9dQZF1DX83I5je4W4rP",
      "37i9dQZF1DX4Y4RhrZqHhr",
      "37i9dQZF1DX6RA5ZrA5a23"
    ]
    playlistUrl = randomUrl[i];
  };
  if (spirit === "Vodka") {
    randomUrl = [
      "37i9dQZF1DWXRqgorJj26U",
      "37i9dQZF1DXdmXczhgY3oW",
      "37i9dQZEVXbMDoHDwVN2tF"
    ]
    playlistUrl = randomUrl[i];
  };
  if (spirit === "Gin") {
    randomUrl = [
      "37i9dQZF1DWV7EzJMK2FUI",
      "37i9dQZF1DXd9rSDyQguIk",
      "37i9dQZF1DXdwTUxmGKrdN"
    ]
    playlistUrl = randomUrl[i];
  };
  if (spirit === "Tequila") {
    randomUrl = [
      "37i9dQZF1DXa2PvUpywmrr",
      "37i9dQZEVXbLRQDuF5jeBp",
      "37i9dQZF1DWUa8ZRTfalHk"
    ]
    playlistUrl = randomUrl[i];
  };
  console.log(randomUrl[i]);
  document.getElementById("spotify-frame").src = openingUrl + playlistUrl;
}

// MODAL SCRIPT
// DOM ELEMENTS

const modal = document.querySelector('#site-modal');
const closeBtn = document.querySelector('.close');
// EVENTS
window.addEventListener('load', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
// OPEN LOAD MODAL
function openModal() {
  modal.style.display = 'block';
  if(localStorage.getItem("newUser")==='null'){
    modal.style.display = 'block';
    localStorage.setItem("newUser", 'no')
  }
}
  if(localStorage.getItem("newUser")==='no'){
    modal.style.display = 'none';
}
// CLOSE MODAL
function closeModal() {
  modal.style.display = 'none';
}
// CLOSE MODAL IF OUTSIDE CLICK
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
