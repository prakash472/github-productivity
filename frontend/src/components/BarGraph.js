import React from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ data }) => {
  // Extract relevant data from prop
  const contributorsData = data.map((item) => {
    return {
      repo: item.repo,
      contributor: item.contributor,
      fixingScore: item.contributor_scores.fixing_code_scores,
      refactorScore: item.contributor_scores.refactor_code_scores,
      frequencyScore: item.contributor_scores.commit_frequency_scores,
    };
  });

  // Sort contributorsData by sum of scores
  const sortedData = contributorsData.sort(
    (a, b) =>
      b.fixingScore +
      b.refactorScore +
      b.frequencyScore -
      (a.fixingScore + a.refactorScore + a.frequencyScore)
  );

  // Take top 5 contributors by sum of scores
  const top5Contributors = sortedData.slice(0, 5);

  // Extract relevant data from top5Contributors
  const top5ContributorsLabels = top5Contributors.map(
    (contributorData) => contributorData.contributor
  );
  const top5ContributorsFixingScores = top5Contributors.map(
    (contributorData) => contributorData.fixingScore
  );
  const top5ContributorsRefactorScores = top5Contributors.map(
    (contributorData) => contributorData.refactorScore
  );
  const top5ContributorsFrequencyScores = top5Contributors.map(
    (contributorData) => contributorData.frequencyScore
  );

  // Create chart data object
  const chartData = {
    labels: top5ContributorsLabels,
    datasets: [
      {
        label: "Fixing Scores",
        data: top5ContributorsFixingScores,
        backgroundColor: "#FF6384",
      },
      {
        label: "Refactor Scores",
        data: top5ContributorsRefactorScores,
        backgroundColor: "#36A2EB",
      },
      {
        label: "Frequency Scores",
        data: top5ContributorsFrequencyScores,
        backgroundColor: "#FFCE56",
      },
    ],
  };

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
        height={400}
      />
    </div>
  );
};

export default BarGraph;
