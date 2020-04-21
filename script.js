//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
 
 let epi = '';
 for(let i=0; i<episodeList.length; i++){
  epi = epi +  `
  <div class="third">
  <h4 class= "epi-title"> ${episodeList[i].name} - S${ episodeList[i].season < 9 ? '0'+  episodeList[i].season :  episodeList[i].season  }E${ episodeList[i].number < 9 ? '0'+  episodeList[i].number :  episodeList[i].number  } </h4>
  <img src=" ${ episodeList[i].image.medium } " />
  ${ episodeList[i].summary }
  </div>
  `;
 } 
 


 rootElem.innerHTML = epi;
  
}

window.onload = setup;
