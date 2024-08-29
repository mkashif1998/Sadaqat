import React, { useState, useEffect } from "react";

const Table = ({ headings, data = [], display }) => {
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    if (display === 1) {
      // Show data one by one with a 2-second interval
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < data.length) {
          setDisplayedData((prevData) => [...prevData, data[index]]);
          index++;
        } else {
          index = 0; // Reset index to loop through data again
        }
      }, 2000);

      return () => clearInterval(intervalId); // Clear interval on component unmount
    } else if (display === 2) {
      // Show random data every second
      const intervalId = setInterval(() => {
        if (data.length > 0) {
          // Generate a random index
          const randomIndex = Math.floor(Math.random() * data.length);
          // Get the data at the random index
          const randomData = data[randomIndex];
          // Update displayed data
          setDisplayedData((prevData) => [...prevData, randomData]);
        }
      }, 1000);

      return () => clearInterval(intervalId); // Clear interval on component unmount
    }
  }, [data, display]);

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
