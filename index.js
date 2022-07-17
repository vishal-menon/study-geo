//~~~~~~~~~~~~~~~~~~~~~~~~~~~Model~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const goToCapital = document.getElementById("capital-button");
const goToStats = document.getElementById("stats-button");







//~~~~~~~~~~~~~~~~~~~~~~~~~~~Controller~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

goToCapital.addEventListener("click", () => {
  window.location.replace("capital.html");
})

goToStats.addEventListener("click", () => {
  window.location.replace("stats.html");
})


if(localStorage.getItem("capitalsGuessed") === null)
{
  const Zero = 0;
  localStorage.setItem("capitalsGuessed", JSON.stringify(Zero));
  localStorage.setItem("capitalsWon", JSON.stringify(Zero));
}