// DOM HTML ELEMENTS
const inputEl = document.getElementById("input-el");
const button = document.getElementById("button");
const text = document.getElementById("text");
const toEl = document.getElementById("to");
const fromEl = document.getElementById("from");
const flagFrom = document.getElementById("flag-from");
const flagTo = document.getElementById("flag-to");

const apiKey = "b0a3b7465025c2c6f27978cb";

// Country-to-currency map (ISO 3166-1 alpha-2 country code)
const currencyCountryMap = {
  USD: "US", EUR: "DE", GBP: "GB", JPY: "JP", SAR: "SA",
  AED: "AE", INR: "IN", CNY: "CN", CAD: "CA", AUD: "AU",
  EGP: "EG", TRY: "TR"
};

// Load currencies into dropdowns
async function loadCurrencies() {
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  const response = await fetch(url);
  const data = await response.json();
  
  const currencies = Object.keys(data.conversion_rates);

  currencies.forEach(currency => {
    // Add options for both from and to dropdowns
    fromEl.innerHTML += `<option value="${currency}">${currency}</option>`;
    toEl.innerHTML += `<option value="${currency}">${currency}</option>`;
  });

  // Set default values and update flags
  fromEl.value = "USD";
  toEl.value = "SAR";
  updateFlags();
}

// Get the flag URL based on the currency
function getFlagUrl(currency) {
  const code = currencyCountryMap[currency] || currency.slice(0, 2).toUpperCase();
  return `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;  // Update for flag size (24x18)
}

// Update flags when either from or to currency changes
function updateFlags() {
  flagFrom.src = getFlagUrl(fromEl.value);
  flagTo.src = getFlagUrl(toEl.value);
}

fromEl.addEventListener("change", updateFlags);
toEl.addEventListener("change", updateFlags);

// Currency conversion logic
button.addEventListener("click", currenciesConventor);

async function currenciesConventor() {
  const from = fromEl.value;
  const to = toEl.value;
  const amount = inputEl.value.trim();
  
  try {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
    const response = await fetch(url);
    const data = await response.json();

    // Check if the API response is successful
    if (data.result !== "success") {
      text.textContent = "Something went wrong. Please try again later.";
      return;
    }

    // Check if the user has entered a valid amount
    if (!amount || isNaN(amount)) {
      text.textContent = "You should add a valid number.";
      inputEl.value = '';
      return;
    }

    // Convert the currency
    const rate = data.conversion_rates[to];
    const converted = (amount * rate).toFixed(2);
    text.textContent = `Converted ${amount} ${from} to ${to} → ${converted} ${to}`;
    inputEl.value = '';
  } catch (error) {
    console.error(error);
    text.textContent = "Sorry, we'll fix the issue soon. Thank you for your understanding.";
  }
}

// Load currencies on page load
loadCurrencies();
