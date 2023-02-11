import Chart from "chart.js/auto";

export default {
  statisticsBoard: null,
  changeData(newData) {
    console.log(this);
  },
  init() {
    const data = [];
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
        plugins: {
          black: {
            color: "white",
          },
        },
        animation: { delay: 1000 },
      },
      plugins: [
        {
          id: "black",

          beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = options.color;
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.strokeStyle = "white";

            ctx.restore();
          },
        },
      ],
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by a",
            data: data.map((row) => row.count),
            //   backgroundColor: "white",
            backgroundColor: "white",
            pointBackgroundColor: "red",
          },
          {
            label: "Acquisitions by a",
            data: data.map((row) => row.count),
            //   backgroundColor: "white",
            backgroundColor: "white",
            pointBackgroundColor: "red",
          },
        ],
      },
    });
  },
};
