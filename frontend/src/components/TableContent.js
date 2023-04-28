import React, { useState } from "react";
import Modal from "./Modal";

const contributor_commit_message_mapping={}

const TableContent = ({data}) => {
  const tableData = data.map((data, index) => {
    const { contributor, commits, contributor_scores } = data;
    const numCommits = commits.length;
    contributor_commit_message_mapping[contributor]=[...commits];
    const commitScore =
      contributor_scores.fixing_code_scores +
      contributor_scores.refactor_code_scores +
      contributor_scores.commit_frequency_scores;
    const commitMessage = commits.map((commit) => ({
      message: commit.message,
      date: commit.date,
    }));

    return {
      id: index + 1,
      contributor,
      numCommits,
      commitScore,
      commitMessage,
    };
  });

  tableData.sort((a, b) => b.commitScore - a.commitScore);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const startIndex=1;
  const totalItems = data.length;
  const endIndex = Math.floor(totalItems / itemsPerPage)

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const showModalHandler = (message) => {
    setShowModal(true);
    setModalMessage(message);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-left font-bold">
              <th className="px-6 pt-5 pb-4">Contributors</th>
              <th className="px-6 pt-5 pb-4">Number of Commits</th>
              <th className="px-6 pt-5 pb-4">Commit Score</th>
              <th className="px-6 pt-5 pb-4">Commit Message</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.contributor}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.numCommits}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.commitScore}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <button
                    onClick={() => showModalHandler(item.contributor)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            {currentPage !== 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="py-2 px-4 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:shadow-outline-blue active:bg-blue-800 active:text-white transition duration-150 ease-in-out"
              >
                Previous
              </button>
            )}
            {currentPage !== totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="py-2 px-4 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:shadow-outline-blue active:bg-blue-800 active:text-white transition duration-150 ease-in-out"
              >
                Next
              </button>
            )}
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm leading-5 text-gray-700">
                Showing
                <span className="font-medium mx-1">{startIndex}</span>
                to
                <span className="font-medium mx-1">{endIndex}</span>
                of
                <span className="font-medium mx-1">{totalItems}</span>
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex shadow-sm">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    id={i + 1}
                    onClick={handlePageClick}
                    disabled={currentPage === i + 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 ${
                      currentPage === i + 1 ? "bg-gray-100" : ""
                    } ${i === 0 ? "rounded-l-md" : ""} ${
                      i === totalPages - 1 ? "rounded-r-md" : ""
                    }`}
                    style={{ margin: "0 2px" }}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
      {showModal && <Modal modalList={contributor_commit_message_mapping[modalMessage]} setShowModal={setShowModal} />}
    </div>
  );
};

export default TableContent;
