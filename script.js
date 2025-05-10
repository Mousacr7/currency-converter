const country_code = {
  "USD": "US",
  "SAR": "SA",
  "EUR": "EU",
  "GBP": "GB",
  "INR": "IN",
  "JPY": "JP",
  "CNY": "CN",
  "PKR": "PK",
  "TRY": "TR",
  "NGN": "NG"
};

const dropList = document.querySelectorAll("select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");

for (let select of dropList) {
  for (let currency_code in country_code) {
    let option = document.createElement("option");
    option.value = currency_code;
    option.textContent = currency_code;
    if (select.name === "from" && currency_code === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currency_code === "SAR") {
      option.selected = true;
    }
    select.appendChild(option);
  }

  select.addEventListener("change", e => {
    updateFlag(e.target);
  });
}

function updateFlag(element) {
  let currencyCode = element.value;
  let countryCode = country_code[currencyCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", e => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-down i");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;

  updateFlag(fromCurrency);
  updateFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amountInput = document.querySelector(".amount input");
  let amount = parseFloat(amountInput.value) || 1;
  amountInput.value = amount;

  const exchangeRateTxt = document.querySelector(".exchange-rate");
  exchangeRateTxt.textContent = "Getting exchange rate...";

  let from = fromCurrency.value;
  let to = toCurrency.value;

  let url = `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${from}`;

  fetch(url)
    .then(res => res.json())
    .then(result => {
      let rate = result.conversion_rates[to];
      let totalExRate = (amount * rate).toFixed(2);
      exchangeRateTxt.textContent = `${amount} ${from} = ${totalExRate} ${to}`;
    })
    .catch(() => {
      exchangeRateTxt.textContent = "Something went wrong";
    });
}
