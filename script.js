//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  const searchBox = document.getElementById('searchBox');
  searchBox.addEventListener('keyup', doSearch);
  const selectBox = document.getElementById('selectBox');
  fillUpselections(allEpisodes, selectBox);
   
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  let epi = '';
  for (let i = 0; i < episodeList.length; i++) {
    let epiTitle = ` ${episodeList[i].name} - S${episodeList[i].season < 9 ? '0' + episodeList[i].season : episodeList[i].season}E${episodeList[i].number < 9 ? '0' + episodeList[i].number : episodeList[i].number}`;

    epi = epi + `
  <div class="third" >
  <h4 class= "epi-title" id="${ epiTitle }"> ${ epiTitle } </h4>
  <img src=" ${ episodeList[i].image.medium} " />
  ${ episodeList[i].summary}
  </div>
  `;
  }

  if (episodeList.length === 0) {
    epi = '<p> sorry. No episodes with this Name or discreption </p>';
  }

  document.getElementById('itemsNumber').innerHTML = `<p> Episods Found : ${episodeList.length}</p>`
  rootElem.innerHTML = epi;

}

function doSearch(e) {
  let allEpi = document.querySelectorAll('.third');
  const data = getAllEpisodes();
  let term = e.target.value.trim();
  let filteredEpi = data.filter((e) => {
    return e.name.toLowerCase().includes(term.toLowerCase()) || e.summary.toLowerCase().includes(term.toLowerCase())
  })

  allEpi.forEach((e) => {
    e.style.display = 'none';
  })

  makePageForEpisodes(filteredEpi);

}


function fillUpselections(episodeList, rootElem){
  

  let epi = `<select id="epiSelector" autofocus="-1"  onChange=" handleSelect(this.value)"> <option value="All Episodes" selected="selected">All Episodes</option>`;
  for (let i = 0; i < episodeList.length; i++) {
    let epiTitle = ` ${episodeList[i].name} - S${episodeList[i].season < 9 ? '0' + episodeList[i].season : episodeList[i].season}E${episodeList[i].number < 9 ? '0' + episodeList[i].number : episodeList[i].number}`;
    epi = epi + `
    <option value="${ epiTitle }"> ${ epiTitle } </option> 
    `;
  }
  epi += '</select>'

  rootElem.innerHTML = epi;

}

function handleSelect(elm){
  if(elm === "All Episodes"){
    return window.location.href=""
  }
  else {
    
    const data = getAllEpisodes();
    let allEpi = document.querySelectorAll('.third');

    let filteredEpi = data.filter((e) => {
      return elm.toLowerCase().includes(e.name.toLowerCase()) 
    })
  
    allEpi.forEach((e) => {
      e.style.display = 'none';
    })

   
  
    makePageForEpisodes(filteredEpi);

  }
  // window.location.href=elm
}


window.onload = setup;
