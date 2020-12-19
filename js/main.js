const QUOTES_URL = "https://type.fit/api/quotes";
const GET_IP_URL = "https://api.ipify.org/?format=json";
const IP_INFO_URL = "https://json.geoiplookup.io/";
const time = document.querySelector(".time time");

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

async function initialize() {
  try {
    const [quote, ip] = await Promise.all([
      (await fetch(QUOTES_URL)).json(),
      (await fetch(GET_IP_URL)).json(),
    ]);
    const ipInfo = await (await fetch(IP_INFO_URL + ip.ip)).json();
    const {text, author} = quote[parseInt(getRandomArbitrary(0, quote.length))];
    const { city, country_name: countryName } = ipInfo; 
    document.querySelector(".quote quote").innerText = text;
    document.getElementById("author").innerText = author;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/daily')";
    document.getElementById("location").innerText = `IN ${city}, ${countryName}`.toUpperCase();
    displayTime();
  } catch (e) {
    console.log(e);
  }
}

function displayTime() {
  let greeting = document.getElementById("greeting");
  let today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  time.innerText = hour + ":" + minute;
  if (hour >= 5 && hour < 12) {
    greeting.innerText = "GOOD MORNING, IT'S CURRENTLY";
  } else if (hour > 12 && hour < 17) {
    greeting.innerText = "GOOD AFTERNOON, IT'S CURRENTLY";
  } else {
    greeting.innerText = "GOOD EVENING, IT'S CURRENTLY";
  }
  setInterval(displayTime, 1000);
}

document.getElementById("refresh").addEventListener("click", () => {
  fetch("https://type.fit/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      const { text, author } = data[
        parseInt(getRandomArbitrary(0, data.length))
      ];
      document.querySelector(".quote quote").innerText = text;
      document.getElementById("author").innerText = author;
    })
    .catch((err) => console.log(err));
});

initialize();
