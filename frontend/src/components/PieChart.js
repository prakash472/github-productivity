import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
// If not added will give an error for arc is not found.

const PieChart = ({ data }) => {
  // Extract contributors and scores from data prop
  const contributorsData = data.map((item) => {
    const totalScores = item.contributor_scores.fixing_code_scores+item.contributor_scores.commit_frequency_scores+item.contributor_scores.refactor_code_scores
    return {
      contributor: item.contributor,
      scores:totalScores
    };
  });
  // Sort contributorsData by sum of scores
  const sortedContributorsData = contributorsData.sort(
    (a, b) =>
      b.scores-a.scores
  );
  const top5Contributors=sortedContributorsData.slice(0,5);

  const chartData = {
    labels: top5Contributors.map((data) => data.contributor),
    datasets: [
      {
        data: top5Contributors.map((data) => data.scores),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#008000",
          "#800080",
        ],
      },
    ],
  };

//   // Chart options object
  const chartOptions = {
    responsive: true, // Enable dynamic resizing
    maintainAspectRatio: true, // Don't maintain aspect ratio
  };

  return (
    <>
      <div style={{ height: "400px" }}>
      <h3 className="flex justify-left md:ml-40 ml-20">Top 5 Contributors</h3>
      <Pie data={chartData} options={chartOptions} />
    </div>
    </>
  );
};

export default PieChart;