// global elmeents to add events
let themeText = document.getElementById("theme-text");
let searchBox = document.getElementById("search-box");
let filterBox = document.getElementById("dropDown-filter");

//addEvent listner
themeText.addEventListener("click", themeChange);

/*// not used because onchange and onkeyup worked better on html events
 searchBox.addEventListener("onkeyup", searchFilter);
 filterBox.addEventListener("onchange", searchFilter);*/

// boolean value used for theme
let themeMode = true;
// variable used to store data
let datas;

// function theme for boxes
function themeForBox() {
  let box = document.getElementsByClassName("box");
  if (!themeMode) {
    for (let i = 0; i < box.length; i++) {
      box[i].style.backgroundColor = "hsl(209, 23%, 22%)";
      box[i].style.color = "hsl(0, 0%, 52%)";
    }
  } else {
    for (let i = 0; i < box.length; i++) {
      box[i].style.backgroundColor = "hsl(0, 0%, 100%)";
      box[i].style.color = "hsl(200, 15%, 8%)";
    }
  }
}

// function to add Content
function addContent(data, ar) {
  ar = `<a href="https://en.wikipedia.org/wiki/${data.name.common}" target="_blank"><div class="box">
      <img src="${data.flags.png}" class="home-flagImg" />
      <h3 class="country-name">${data.name.common}</h3>
      <p class="box-textArea">Population: <span class="box-values">${data.population}</span>  </p>
      <p class="box-textArea">Region: <span class="box-values">${data.continents}</span></p>
      <p class="box-textArea">Capital: <span class="box-values">${data.capital}</span></p>
    </div></a>`;
  return ar;
}

// for fetching api initially
async function fetchApi() {
  let main = document.querySelector("main");
  // let text = document.getElementById("search-box").value;

  const res = await fetch(`https://restcountries.com/v3.1/all`);
  datas = await res.json();

  // console.log("Image:", datas[1].flags.png);
  // console.log("Name:", datas[1].name.common);
  // console.log("Population:", datas[10].population);
  // console.log("Region:", datas[1].continents);
  // console.log("Capital:", datas[1].capital[0]);
  try {
    let a = "";
    datas.map((data) => {
      a += addContent(data, a);
    });
    main.innerHTML = a;
    themeForBox();
  } catch {
    main.innerHTML = `<div class="errorText">Error Content Not Found</div>`;
  }
}
fetchApi();

// function used to alter theme
function themeChange() {
  let body = document.getElementById("body");
  let header = document.querySelector("header");
  let box = document.getElementsByClassName("box");
  // let searchBox = document.getElementById("search-box");
  if (themeMode) {
    body.style.backgroundColor = "hsl(207, 26%, 17%)";
    themeText.innerHTML = "☀️Light Mode";
    header.style.backgroundColor = "hsl(209, 23%, 22%)";
    header.style.color = "hsl(0, 0%, 52%)";
    body.style.color = "hsl(0, 0%, 52%)";
    searchBox.style.backgroundColor = "hsl(209, 23%, 22%)";
    searchBox.style.color = "hsl(0, 0%, 52%)";
    filterBox.style.backgroundColor = "hsl(209, 23%, 22%)";
    filterBox.style.color = "hsl(0, 0%, 52%)";
    for (let i = 0; i < box.length; i++) {
      box[i].style.backgroundColor = "hsl(209, 23%, 22%)";
      box[i].style.color = "hsl(0, 0%, 52%)";
    }
    themeMode = false;
  } else {
    body.style.backgroundColor = "hsl(0, 0%, 100%)";
    themeText.innerHTML = "🌙 Dark Mode";
    header.style.backgroundColor = "hsl(0, 0%, 98%)";
    header.style.color = "hsl(200, 15%, 8%)";
    body.style.color = "hsl(200, 15%, 8%)";
    searchBox.style.backgroundColor = "hsl(0, 0%, 98%)";
    searchBox.style.color = "hsl(200, 15%, 8%)";
    filterBox.style.backgroundColor = "hsl(0, 0%, 98%)";
    filterBox.style.color = "hsl(200, 15%, 8%)";
    for (let i = 0; i < box.length; i++) {
      box[i].style.backgroundColor = "hsl(0, 0%, 98%)";
      box[i].style.color = "hsl(200, 15%, 8%)";
    }
    themeMode = true;
  }
}
// function display
function displayAccordingly(a) {
  let main = document.querySelector("main");
  if (a == "") {
    main.innerHTML = `<div class="errorText">Search Result Not found</div>`;
  } else {
    main.innerHTML = a;
  }
  themeForBox();
}

// function for search filter
function searchFilter() {
  let text = document.getElementById("search-box").value;
  let sortFilter = document.getElementById("dropDown-filter").value;
  let localData = datas;
  try {
    if (sortFilter == "none") {
      let a = "";
      localData.map((data) => {
        if (data.name.common.toLowerCase().includes(text.toLowerCase())) {
          a += addContent(data, a);
        }
      });
      displayAccordingly(a);
    } else if (sortFilter != "none" && text != "") {
      let a = "";
      localData.map((data) => {
        if (
          sortFilter.toLowerCase().includes(data.continents[0].toLowerCase()) &&
          data.name.common.toLowerCase().includes(text.toLowerCase())
        ) {
          a += addContent(data, a);
        }
      });
      displayAccordingly(a);
    } else if (sortFilter != "none") {
      let a = "";
      localData.map((data) => {
        if (
          sortFilter.toLowerCase().includes(data.continents[0].toLowerCase())
        ) {
          a += addContent(data, a);
        }
      });
      displayAccordingly(a);
    }
  } catch {
    let main = document.querySelector("main");
    main.innerHTML = `<div class="errorText">Error Content Not Found</div>`;
  }
}