//You can edit ALL of the code here
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  let epi = '';
  for (let i = 0; i < episodeList.length; i++) {
    let epiTitle = ` ${episodeList[i].name} - S${episodeList[i].season < 9 ? '0' + episodeList[i].season : episodeList[i].season}E${episodeList[i].number < 9 ? '0' + episodeList[i].number : episodeList[i].number}`;
    epi = epi + `
  <div class="third" >
  <h4 class= "epi-title" id="${ epiTitle}"> ${epiTitle} </h4>
  <img src=" ${ episodeList[i].image ? episodeList[i].image.medium : '#'} " />
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
  const data = window.episodes;
  let term = e.target.value.trim();
  let filteredEpi = data.filter((e) => {
    return e.name.toLowerCase().includes(term.toLowerCase()) || e.summary.toLowerCase().includes(term.toLowerCase())
  })

  allEpi.forEach((e) => {
    e.style.display = 'none';
  })

  makePageForEpisodes(filteredEpi);

}


function fillUpselections(episodeList, rootElem) {


  let epi = `<select id="epiSelector"   onChange=" handleSelect(this.value)"> <option value="All Episodes" selected="selected">All Episodes</option>`;
  for (let i = 0; i < episodeList.length; i++) {
    let epiTitle = ` ${episodeList[i].name} - S${episodeList[i].season < 9 ? '0' + episodeList[i].season : episodeList[i].season}E${episodeList[i].number < 9 ? '0' + episodeList[i].number : episodeList[i].number}`;
    epi = epi + `
    <option value="${ epiTitle}"> ${epiTitle} </option> 
    `;
  }
  epi += '</select>'

  rootElem.innerHTML = epi;

}

function handleSelect(elm) {
  if (elm === "All Episodes") {
    return  makePageForEpisodes(window.episodes);
  }
  else {

    const data = window.episodes;
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


function fillUpselectionsShow(showList, rootElem) {


  let epi = `<select id="showSelector" autofocus="-1"  onChange=" handleSelectShow(this.value)"> <option value="Selcect a show" selected="selected">Selcect a show </option>`;
  for (let i = 0; i < showList.length; i++) {
    let epiTitle = ` ${showList[i].name} `;
    epi = epi + `
    <option value="${showList[i].id}"> ${epiTitle} </option> 
    `;
  }
  epi += '</select>'

  rootElem.innerHTML = epi;

}


function handleSelectShow(showId) {
  if(showId == 'Selcect a show'){
    const rootElem = document.getElementById("root");
      let epiTitle = '<h2> Welcome, please Select a show to show all its data </h2>';
     return  rootElem.innerHTML = epiTitle;
  }
 // selectedShowIdfunc(showId);
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(res => res.json())
    .then(data => {
      const selectBox = document.getElementById('selectBox');
      makePageForEpisodes(data);
      fillUpselections(data, selectBox);
      window.episodes = data;
      fetch(`https://api.tvmaze.com/shows/${showId}`)
          .then(res => res.json())
          .then(data2 => { 
              const title = document.getElementById('showTitle');
              title.innerText = data2.name;

          })
      
    }).catch(err=>{
      const rootElem = document.getElementById("root");
      let epi = '<p> sorry. No data associated with this show existed on the server at the moment </p>';
      console.log(err);
      rootElem.innerHTML = epi;
    })

}


function setup() {
  let args = [...arguments];
  let showId=args[0];
  if(showId){ console.log('id', showId)} else{ console.log('no Id yet') }
  const allShows = getAllShows();
  const selectShow = document.getElementById('selectShow');
  fillUpselectionsShow(allShows, selectShow);
  //  const allEpisodes = getAllEpisodes();
  //  makePageForEpisodes(allEpisodes);
  //var window.selectedShowId;
//  console.log(' select id ', window.selectedShowId);
  const searchBox = document.getElementById('searchBox');
  searchBox.addEventListener('keyup', doSearch);
  const selectBox = document.getElementById('selectBox');
  if (typeof allEpisodes == "undefined") {
    fillUpselections([], selectBox);
  } else {
    fillUpselections(allEpisodes, selectBox);
  }

}

window.onload = setup;
