import React from "react";
import PieChart from "./PieChart";
import TableContent from "./TableContent";
import BarGraph from "./BarGraph";
const Output = ({ responseData }) => {
  return (
    <>
      <div className="pb-10 mt-2">
        <h3 className="text-2xl font-bold mb-2">Table View</h3>
        <TableContent data={responseData} />
      </div>
      <div className="pb-10">
        <h3 className="text-2xl font-bold mb-2">Analytics View</h3>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
            <PieChart data={responseData} />
          </div>
          <div className="w-full md:w-1/2">
            <BarGraph data={responseData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Output;
