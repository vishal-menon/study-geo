//~~~~~~~~~~~~~~~~~~~~~~~~~~Model~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const capitalsGuessed = (localStorage.getItem("capitalsGuessed") === null) ? 0 : localStorage.getItem("capitalsGuessed");
const capitalsWon = (localStorage.getItem("capitalsWon") === null) ? 0 : localStorage.getItem("capitalsWon");
const capwinRatio = (capitalsWon / capitalsGuessed) * 100;

//HTML Elements:
const capPlayedText = document.getElementById("cap-games-played");
const capWonText = document.getElementById("cap-games-won");
const capWinRatioText = document.getElementById("cap-win-ratio");
const backHome = document.getElementById("back-home");
const capitalsCard = document.getElementById("capitals-card");

//~~~~~~~~~~~~~~~~~~~~~~~~~~Misc~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//function that allows you to append :hover css

const appendCSS = (css) => {

  const style = document.createElement('style');
  
  if (style.styleSheet) {
      style.styleSheet.cssText = css;
  } else {
      style.appendChild(document.createTextNode(css));
  }
  
  document.getElementsByTagName('head')[0].appendChild(style);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~View~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const refreshStats = () => {
  capPlayedText.innerHTML = capitalsGuessed;
  capWonText.innerHTML = capitalsWon;
  capWinRatioText.innerHTML = capwinRatio.toFixed(1) + "%";

  let bgColor;

  if(capwinRatio >= 50)
    bgColor="rgba(0,255,0, 0.3)";
  else
    bgColor="rgba(255,0,0, 0.3)";

  const css = `.options:hover{ background-color: ${bgColor} }`;
  appendCSS(css);
}

refreshStats();


//~~~~~~~~~~~~~~~~~~~~~~~~~~Controller~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



backHome.addEventListener("click", () => {
  window.location.replace("index.html");
})