const inputEl = document.getElementById("input-el");
const button = document.getElementById("button");
const text = document.getElementById("text");
const toEl = document.getElementById("to");
const fromEl = document.getElementById("from");
const flagFrom = document.getElementById("flag-from");
const flagTo = document.getElementById("flag-to");

const apiKey = "b0a3b7465025c2c6f27978cb";

// Correct country codes (ISO 3166-1 alpha-2)
const currencyCountryMap = {
  USD: "US", EUR: "DE", GBP: "GB", JPY: "JP", SAR: "SA",
  AED: "AE", INR: "IN", CNY: "CN", CAD: "CA", AUD: "AU",
  EGP: "EG", TRY: "TR"
};

async function loadCurrencies() {
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  const response = await fetch(url);
  const data = await response.json();

  const currencies = Object.keys(data.conversion_rates);

  currencies.forEach(currency => {
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    fromEl.appendChild(option.cloneNode(true));
    toEl.appendChild(option);
  });

  fromEl.value = "USD";
  toEl.value = "SAR";
  updateFlags();
}

function getFlagUrl(currency) {
  const code = currencyCountryMap[currency] || currency.slice(0, 2).toUpperCase();
  return `https://flagsapi.com/${code}/flat/64.png`;
}

function updateFlags() {
  flagFrom.src = getFlagUrl(fromEl.value);
  flagTo.src = getFlagUrl(toEl.value);
}

fromEl.addEventListener("change", updateFlags);
toEl.addEventListener("change", updateFlags);

button.addEventListener("click", currenciesConverter);

async function currenciesConverter() {
  const from = fromEl.value;
  const to = toEl.value;
  const amount = inputEl.value.trim();

  if (!amount || isNaN(amount)) {
    text.textContent = "You should add a valid number.";
    return;
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result !== "success") {
      text.textContent = "Something went wrong.";
      return;
    }

    const rate = data.conversion_rates[to];
    const converted = (amount * rate).toFixed(2);
    text.textContent = `Converted ${amount} ${from} = ${converted} ${to}`;
    inputEl.value = '';
  } catch (error) {
    console.error(error);
    text.textContent = "Sorry, we'll fix the problem soon.";
  }
}

loadCurrencies();

