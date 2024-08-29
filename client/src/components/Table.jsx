import React, { useState, useEffect } from "react";

const Table = ({ headings, data = [] }) => {
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < data?.length) {
        setDisplayedData((prevData) => [...prevData, data[index]]);
        index++;
        if (index === data?.length - 1) {
          index = 0;
        }
      } else {
        clearInterval(intervalId);
      }
    }, 2000);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [data]);

  return (
    <div className="activityTable rounded h-100 shadow">
      <table className="table rounded-md table-borderless text-uppercase h-100">
        <thead className="rounded-md border-0 sticky-header">
          <tr>
            {headings.map((head, index) => (
              <th
                key={index}
                className={`w-25 bg-table-header text-white rounded-md text-center`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="position-relative">
          {displayedData.length > 0 ? (
            displayedData.reverse().map((item, index) => (
              <tr key={index} className="border-b color-white text-center">
                <td className="bg-transparent text-white w-25">{item.date}</td>
                <td className="bg-transparent text-white w-25">{item.day}</td>
                <td className="bg-transparent text-white w-25">{item.time}</td>
                <td className="bg-transparent text-white w-25">
                  {item.activity}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headings.length} className="text-center text-white">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
