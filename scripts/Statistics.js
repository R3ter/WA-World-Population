let stat = null;
class Statistics {
  constructor(data) {
    if (stat) {
      stat.destroy();
    }
    this.statisticsBoard = new Chart(document.getElementById("acquisitions"), {
      type: "line",
      options: {
        scales: {
          y: {
            ticks: {
              color: ["gray", "darkgray"],
            },
          },
          x: {
            ticks: {
              color: ["gray", "darkgray"],
            },
          },
        },
        responsive: true,
        scaleFontColor: "#FFFFFF",
        animation: { delay: 1000 },
      },
      data,
    });
    this.changeData = function (newData) {
      this.statisticsBoard.data = newData;
    };
    this.setColorMode = function (mode) {};
    stat = this.statisticsBoard;
  }
}
