// get fromBox FIRST
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let inputValue = document.getElementById("inputText");
let button = document.querySelector("#btn");
let exchangeURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd/pkr.json"
let select = document.querySelector(".fromBox select");
let select2=document.querySelector(".toBox select")
let search1=document.querySelector("#search")
let search2=document.querySelector("#search2")

//for flags

async function fromflagChanges(countryName) {
  let flagURL =`https://flagsapi.com/${countryName}/flat/64.png`;
  let countryFlag = `<img class="images" src="${flagURL}" alt="${countryName} flag">`;
  document.querySelector(".flagImages").innerHTML = countryFlag;

  return countryFlag;
}
//for creating option in from selecting  countries
function renderValue1(filter=""){
  filter = filter.trim().toLowerCase(); // remove spaces & normalize case
  select.innerHTML=`<option value="" disabled hidden selected>Select Country</option>`

  for (let currCode in countryList) {
    let countryName = countryList2[currCode];

    let option = document.createElement("option");
    option.innerText = ` ${currCode} (${countryName})`;
    option.value = countryList[currCode]; 
    option.dataset.code = currCode;  

    if (
      filter &&
      (
        currCode.toLowerCase().includes(filter) ||
        countryName.toLowerCase().includes(filter) ||
        countryList[currCode].toLowerCase().includes(filter)
      )
    ) {
      option.selected = true;
      fromflagChanges(countryList[currCode]);
    }

    select.append(option);
  }
}

 renderValue1()
//for searching 
search1.addEventListener("input", (event) => {
  event.preventDefault()
    renderValue1(search1.value);
});

// from country flag

select.addEventListener("change", (e) => {
  if (e.value !== "") {
    fromflagChanges(e.value);
  }
});

// to country flag


async function toflagChanges(countryName) {
  let flagURL =`https://flagsapi.com/${countryName}/flat/64.png`;
  let countryFlag = `<img src="${flagURL}" alt="${countryName} flag">`;
  document.querySelector(".toflagImages").innerHTML = countryFlag;
  return countryFlag;
}


//for searching
function renderOption2(filter=""){
  filter = filter.trim().toLowerCase();
  select2.innerHTML=`<option value="" disabled hidden selected>Select Country</option>`

  for (let currCode in countryList) {
    let countryName = countryList2[currCode]; 

    let option2 = document.createElement("option");
    option2.innerText = `${currCode} (${countryName})`;
    option2.value = countryList[currCode];
    option2.dataset.code = currCode;
    select2.append(option2);

    if (
      filter &&
      (
        currCode.toLowerCase().includes(filter) ||
        countryName.toLowerCase().includes(filter) ||
        countryList[currCode].toLowerCase().includes(filter)
      )
    ) {
      option2.selected = true;
      toflagChanges(countryList[currCode]);
    }
  }
}

renderOption2()

search2.addEventListener("input",()=>{
 renderOption2(search2.value)
})
select2.addEventListener("change", (e) => {
  if (e.value !== "") {
    toflagChanges(e.value);
  }
});

// button click
button.addEventListener("click", async (event) => {
  event.preventDefault();
  if (inputValue.value === "") {
    alert("Please Enter Amount!");

  }
  else if(inputValue.value<1){
    inputValue.value="1"
    return
  } 
  else if (select.value === "" || select2.value === "") {
    alert("Please select the country First ");
  } else {
    let code1=select.options[select.selectedIndex].dataset.code;
    let code2=select2.options[select2.selectedIndex].dataset.code;
let url = `${BASE_URL}/${code1.toLowerCase()}.json`;

let response = await fetch(url);
let data = await response.json();
let rate = data[code1.toLowerCase()][code2.toLowerCase()]; 
const amount = parseFloat(inputValue.value);
const converted = (amount * rate).toFixed(2);

// show both the conversion and the unit rate
document.querySelector(".message").innerHTML =
  `${amount} ${code1} = ${converted} ${code2} <small>(1 ${code1} = ${rate} ${code2})</small>`;

  }
});
let button2 = document.querySelector("#btn2");

button2.addEventListener("click",(event)=>{
  event.preventDefault()
  window.print()
})










