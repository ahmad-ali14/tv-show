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

  document.getElementById('itemsNumber').innerHTML = ` Items Found : ${episodeList.length}`
  rootElem.innerHTML = epi;

}



function makePageForShows(showList) {
  window.episodes = [];
  window.shows = showList;
  const rootElem = document.getElementById("root");

  let epi = '';
  for (let i = 0; i < showList.length; i++) {
    let epiTitle = ` ${showList[i].name}`;
    let gen ='';
    showList[i].genres.forEach(e => gen = gen + e)
    epi = epi + `
  <div class="third" >
  <h4 class= "epi-title" id="${showList[i].id}"> ${epiTitle} </h4>
  <img src=" ${ showList[i].image ? showList[i].image.medium : '#'} " />
  ${ showList[i].summary}

  <p class="lasttext"> status:  ${ showList[i].status }   ,
  rating: ${  showList[i].rating.average }   </p>
  <p class="lasttext">
  runtime: ${  showList[i].runtime }   , 
  genres:  ${ gen } 
</p> 

  <button class="btn-show" onClick="handleSelectShow(${ showList[i].id })" > see Episodes </button>
  </div>
  `;
  }

  if (showList.length === 0) {
    epi = '<p> sorry. No Shows with this Name or discreption </p>';
  }

  document.getElementById('itemsNumber').innerHTML = ` Items Found : ${showList.length}`
  rootElem.innerHTML = epi;
}

function doSearch(e) {
  let allEpi = document.querySelectorAll('.third');

  var data = window.episodes;
  if ( window.episodes.length == 0) { 
    
    data = window.shows;
  
    let term = e.target.value.trim();
    let filteredEpi = data.filter((e) => {
    return e.name.toLowerCase().includes(term.toLowerCase()) || e.summary.toLowerCase().includes(term.toLowerCase())
  })

  allEpi.forEach((e) => {
    e.style.display = 'none';
  })

  return makePageForShows(filteredEpi);
  
  
  }
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


  let epi = `<select id="showSelector" autofocus="-1"  onChange=" handleSelectShow(this.value)"> <option value="All Shows" selected="selected">All Shows </option>`;
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
  if(showId == 'All Shows'){
    const allShows = getAllShows();
    const title = document.getElementById('showTitle');
    title.innerText = 'All Shows';
    return makePageForShows(allShows);
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
              let element = document.getElementById('showSelector');
              element.value = showId;

          })
      
    }).catch(err=>{
      const rootElem = document.getElementById("root");
      let epi = '<p> sorry. No data associated with this show existed on the server at the moment </p>';
      console.log(err);
      rootElem.innerHTML = epi;
    })

}

function doingDiffSort(compare){


  let allEpi = document.querySelectorAll('.third');

  var data = window.episodes;
  if ( window.episodes.length == 0) { 
    
    data = window.shows;
      let filteredEpi = data.sort(compare)
      console.log('doing sort shows');
      console.log(filteredEpi);

  allEpi.forEach((e) => {
    e.style.display = 'none';
  })

  return makePageForShows(filteredEpi);
  
  
  }
  let filteredEpi = data.sort( compare )
  console.log('doing sort epis');
  console.log(filteredEpi);

  allEpi.forEach((e) => {
    e.style.display = 'none';
  })

  makePageForEpisodes(filteredEpi);


}

function doSort(e){
  console.log(e.target.value);
  let v = e.target.value;
  if(v == 'name-a-z'){
    function compare(a, b) {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
    
      return 0;
    }
   
    doingDiffSort(compare);
  
  }

  if(v == 'name-z-a'){
    function compare(a, b) {
      if (b.name > a.name) return 1;
      if (a.name > b.name) return -1;
    
      return 0;
    }
   
    doingDiffSort(compare);
  
  }

  if(v == 'rating+'){
    function compare(a, b) {
      if (a.rating.average > b.rating.average) return 1;
      if (b.rating.average > a.rating.average) return -1;
    
      return 0;
    }
   
    doingDiffSort(compare);
  
  }

  if(v == 'rating-'){
    function compare(a, b) {
      if (b.rating.average > a.rating.average) return 1;
      if (a.rating.average > b.rating.average) return -1;
    
      return 0;
    }
   
    doingDiffSort(compare);
  
  }

  if(v == 'no-sort'){
    setup();
  
  }



 


}


function setup() {
  let args = [...arguments];
  let showId=args[0];
  if(showId){ console.log('id', showId)} else{ console.log('no Id yet') }
  const allShows = getAllShows();
  const selectShow = document.getElementById('selectShow');
  fillUpselectionsShow(allShows, selectShow);
  makePageForShows(allShows);
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


  const goBack = document.getElementById('goBack');
  goBack.addEventListener('click', ()=>{ setup(); });


  const ttitle = document.getElementById('showTitle');
    ttitle.innerText = 'All Shows';

    const sortBox = document.getElementById('sort');
    sortBox.addEventListener('change', doSort);

}

window.onload = setup;
