// elements
const fromDropList = document.querySelector(".from select");
const toDropList = document.querySelector(".to select");
const getButton = document.querySelector("form button");
const fromFlag = document.querySelector(".from img");
const toFlag = document.querySelector(".to img");
const amountInput = document.querySelector("form input");
const exchangeRateTxt = document.querySelector("form .exchange-rate");

// populate currency options
for (let code in country_code) {
  let optionTag = `<option value="${code}">${code}</option>`;
  fromDropList.insertAdjacentHTML("beforeend", optionTag);
  toDropList.insertAdjacentHTML("beforeend", optionTag);
}

fromDropList.value = "USD";
toDropList.value = "SAR";

// update flags
function loadFlag(selectEl, flagEl) {
  const countryCode = country_code[selectEl.value];
  flagEl.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

fromDropList.addEventListener("change", () => loadFlag(fromDropList, fromFlag));
toDropList.addEventListener("change", () => loadFlag(toDropList, toFlag));

// exchange function
async function getExchangeRate() {
  const amount = parseFloat(amountInput.value) || 1;
  amountInput.value = amount;

  exchangeRateTxt.innerText = "Getting exchange rate...";
  const fromCurrency = fromDropList.value;
  const toCurrency = toDropList.value;

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${fromCurrency}`);
    const data = await res.json();

    if (data.result === "success") {
      const rate = data.conversion_rates[toCurrency];
      const total = (amount * rate).toFixed(2);
      exchangeRateTxt.innerText = `${amount} ${fromCurrency} = ${total} ${toCurrency}`;
    } else {
      exchangeRateTxt.innerText = "Failed to fetch exchange rate.";
    }
  } catch (error) {
    exchangeRateTxt.innerText = "Something went wrong.";
  }
}

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

window.addEventListener("load", getExchangeRate);
