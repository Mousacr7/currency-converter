//  DOM HTML ELEMENT//
const inputEl = document.getElementById("input-el");
const button = document.getElementById("button");
const text = document.getElementById("text");
const toEl = document.getElementById("to");
const fromEl = document.getElementById("from");

const apiKey = "b0a3b7465025c2c6f27978cb";
//LOAD CURRENCIES 
async function loadCurrencies() {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const currencies = Object.keys(data.conversion_rates)
   
    currencies.forEach(currency => {

        fromEl.innerHTML += `<option value="${currency}">${currency}</option>`;
        toEl.innerHTML += `<option value="${currency}">${currency}</option>`;
      });
}
loadCurrencies()
//CURRENCIES CONVERTOR//
button.addEventListener("click", currenciesConventor)
async function currenciesConventor() {
    const from = fromEl.value
    const to = toEl.value
    amount = inputEl.value.trim();
    
    try {
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`
    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
        //CHECK IF THERE PROPLEM WITH THE API LINK OR THE KEY
    if(data.result !== "success") {
      text.textContent = "something went wrong ";
        return;
    }
    // CHECK USER VALUE
    if(!amount || isNaN(amount)) {
       text.textContent = "you should add a valid number"
        inputEl.value = ''
        return;
    }
    //CONVERT METHOD
    let rate = data.conversion_rates[to];
    converted = amount * rate
    console.log(rate)
    text.textContent = `Converte ${amount} ${from} To ${to} → ${converted} ${to}`;
    inputEl.value = ''
} //CHECK IF THERE PROPLEM WITH THE API LINK OR THE KEY
catch (error) {
    console.error(error)
    text.textContent = "sorry for that we gonna fix the proplem soon thank you for your understunding"
}
}
