let stockChart;

function drawChart(labels, data) {
  const ctx = document.getElementById("stockChart").getContext("2d");

  if (stockChart) {
    stockChart.destroy(); // Clear previous chart
  }

  stockChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Stock Price (USD)",
        data: data,
        borderColor: "#0077cc",
        backgroundColor: "rgba(0, 119, 204, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: { maxTicksLimit: 10 }
        }
      }
    }
  });
}
