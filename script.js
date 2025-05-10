const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Map currency to country code for flags
const countryList = {
    USD: "US",
    EUR: "EU",
    SAR: "SA",
    JPY: "JP",
    GBP: "GB",
    NGN: "NG",
    INR: "IN",
    CAD: "CA",
    AUD: "AU"
};

// Populate dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        if ((select.name === "from" && currCode === "USD") ||
            (select.name === "to" && currCode === "SAR")) {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update flag
function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Convert currency
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value || 1;

    const url = `${BASE_URL}${fromCurr.value}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        let rate = data.rates[toCurr.value];
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching data.";
    }
});

