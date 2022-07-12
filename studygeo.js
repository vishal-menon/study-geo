const arrayCountries = fetch('https://restcountries.com/v3.1/all').then(res => res.json()).then(res => {return res});

const flagPic = document.getElementById("Flagid");
const cardHead = document.getElementById("heading-name");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next-button");
const textBox = document.getElementById("textbox");
const result = document.getElementById("result");
const answer = document.getElementById("answer");
const outputBox = document.getElementById("output-box");
const backHome = document.getElementById("back-home");

let capital;


let getRandomCountry = async() => {
  const a = await arrayCountries;
  const randNum = Math.floor(Math.random() * a.length);
  return a[randNum];
}

let updateCard = async() => {

  const randCountry = await getRandomCountry();

  const flagUrl = randCountry.flags.png;
  const name = randCountry.name.common;
  capital = randCountry.capital;

  capital.forEach(capitals => {
  console.log(capitals);
  });

  console.log(name);
  console.log(flagUrl);

  cardHead.innerHTML = name;
  flagPic.setAttribute("src",flagUrl);

}

let correctDisplay = () => {
  result.innerHTML="Correct!";
  outputBox.style.backgroundColor = "rgba(67, 243, 67, 0.507)";
}

let wrongDisplay = () => {
  result.innerHTML="Wrong!";
  outputBox.style.backgroundColor = "rgba(243, 82, 67, 0.507)";
}

let showCapitals = (capital) => {

  let x="";

  capital.forEach(capitals => {
     x = x.concat(capitals,",");
  })

  x = x.slice(0, -1);

  console.log(x);

  answer.innerHTML = x;

}

submitButton.addEventListener("click", () => {

console.log("clicked");

let found = false;

capital.forEach(capitals => {
  if(textBox.value.toLowerCase() === capitals.toLowerCase())
  {
    correctDisplay();
    console.log("correct!");
    found = true;
  }
});

if(!found)
{
wrongDisplay();
console.log("wrong!");
}

showCapitals(capital);

});

nextButton.addEventListener("click", () => {
  textBox.value = "";
  textBox.focus();
  result.innerHTML = "";
  answer.innerHTML = "";
  outputBox.style.backgroundColor = "rgba(0,0,0,0)";
  updateCard();
})

backHome.addEventListener("click", () => {
  window.location.replace("index.html");
})




updateCard();