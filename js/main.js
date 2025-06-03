async function getStockData() {
  const symbol = document.getElementById("stockSymbol").value.toUpperCase();
  if (!symbol) return alert("Please enter a stock symbol");

  const apiKey = "a2bde06e551b427e99c153f6faf9e218"; // twele data api key 
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "error") {
      alert("Error: " + data.message);
      return;
    }

    const timeSeries = data.values.reverse(); // oldest price in the first place
    const labels = timeSeries.map(entry => entry.datetime);
    const prices = timeSeries.map(entry => parseFloat(entry.close));

    document.getElementById("stock-name").textContent = `${symbol} - Last 30 Days`;
    document.getElementById("stock-price").textContent = `Latest Close: $${prices.at(-1).toFixed(2)}`;

    drawChart(labels, prices);
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to load stock data.");
  }
  addToWatchlist(symbol);
}


function addToWatchlist(symbol) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  if (!watchlist.includes(symbol)) {
    watchlist.push(symbol);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    renderWatchlist();
  }
}

function renderWatchlist() {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const listEl = document.getElementById("watchlist-items");
  listEl.innerHTML = "";
  watchlist.forEach(symbol => {
    const li = document.createElement("li");
    li.textContent = symbol;
    li.onclick = () => {
      document.getElementById("stockSymbol").value = symbol;
      getStockData();
    };
    listEl.appendChild(li);
  });
}

// called when page is loaded
renderWatchlist();


function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  
}

// called when page is loaded
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}


setInterval(() => {
  const currentSymbol = document.getElementById("stockSymbol").value;
  if (currentSymbol) getStockData();
}, 60000); // refresh every minute 
