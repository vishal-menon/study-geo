//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Model~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//This array stores all the info from the web server request -> this provides us with data of all countries in the world.
const arrayCountries = fetch('https://restcountries.com/v3.1/all').then(res => res.json()).then(res => {return res});


//These are a bunch of HTML Elements that we need to modify
const flagPic = document.getElementById("Flagid");
const cardHead = document.getElementById("heading-name");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next-button");
const textBox = document.getElementById("textbox");
const result = document.getElementById("result");
const answer = document.getElementById("answer");
const outputBox = document.getElementById("output-box");
const backHome = document.getElementById("back-home");


//These represent the current Countries data values.
let capital, flagUrl, countryName;

//A variable that allows me to switch 1 button between 'Next' and 'Submit' Options.
let submitOrNext = 0; // 0 -> Submit, 1 -> Next

// This function takes the 'arrayCountries' and returns a random 'country' object from it.
const getRandomCountry = async() => {
  const a = await arrayCountries;
  const randNum = Math.floor(Math.random() * a.length);
  return a[randNum];
}


const updateCurrentCountry = async() => {

  const randCountry = await getRandomCountry();

  //Updates current country details.
  flagUrl = randCountry.flags.png;
  countryName = randCountry.name.common;
  capital = randCountry.capital;

  //Updates the Visual Card (HTML/CSS) on screen.
  updateCard();

}

const findCapital = (capital) => {
  let found = false;

  capital.forEach(capitals => {
    console.log(capitals.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
    console.log(capitals.toLowerCase());
    if(textBox.value.toLowerCase().normalize('NFD') === capitals.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    {
      
      found = true;
    }
  });

  return found;
}

const updateLocalStats = (found) => {

  const capitalsGuessed = JSON.parse(localStorage.getItem("capitalsGuessed"));
  localStorage.setItem("capitalsGuessed", JSON.stringify(capitalsGuessed+1));

  if(found)
  {
    const capitalsWon = JSON.parse(localStorage.getItem("capitalsWon"));
    localStorage.setItem("capitalsWon", JSON.stringify(capitalsWon+1));
  }

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~View~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// This function purely updates the card on screen.
let updateCard = () => {
  cardHead.innerHTML = countryName;
  flagPic.setAttribute("src",flagUrl);
}


//Called when answer is correct. (User input)
let correctDisplay = () => {
  result.innerHTML="Correct!";
  outputBox.style.backgroundColor = "rgba(67, 243, 67, 0.507)";
}

//Called when answer is wrong. (User input)
let wrongDisplay = () => {
  result.innerHTML="Wrong!";
  outputBox.style.backgroundColor = "rgba(243, 82, 67, 0.507)";
}

//This concatenates the string for all capitals (In-case a country has more than 1 capital) and updates the webpage.
let showCapitals = (capital) => {
  let x="";

  capital.forEach(capitals => {
     x = x.concat(capitals,", ");
  })

  x = x.slice(0, -2);
  answer.innerHTML = x;
}

const toggleSubmit = () => {

  if(!submitOrNext)
    submitButton.innerHTML = "Next";
  else
    submitButton.innerHTML = "Submit";

  submitOrNext = !submitOrNext;
}

const refreshAnswer = () => {

  textBox.value = "";
  textBox.focus();
  result.innerHTML = "";
  answer.innerHTML = "";
  outputBox.style.backgroundColor = "rgba(0,0,0,0)";

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Controller~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

submitButton.addEventListener("click", () => {

  //If submit is clicked.
  if(!submitOrNext)
  { 
    if(!(capital === undefined))
    { 
    const found = findCapital(capital);

    if(found)
      correctDisplay();
    else
      wrongDisplay();

    updateLocalStats(found);
    
    showCapitals(capital);
    }
    
    //Update display and toggle button
    toggleSubmit();

  }
  else //If next is clicked.
  {
    refreshAnswer();
    updateCurrentCountry();
    toggleSubmit();
  }


});

textBox.addEventListener("keypress", (event) => {

  if(event.key === "Enter")
    submitButton.click();

})

backHome.addEventListener("click", () => {
  window.location.replace("index.html");
})



updateCurrentCountry();