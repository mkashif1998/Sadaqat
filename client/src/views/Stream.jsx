import React, { useEffect, useState } from "react";
import { useStore } from "../context/Context";
import Camera from "../components/Camera";
import Table from "../components/Table";
import {
  wastingTime as wastTime,
  peopleCount,
  guardActivity,
  employeeAvailibility,
  emptyWorkstation,
  conversation as convData,
  clothAbusing,
} from "../constants/tables";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Import Lucide icons

import employeAval from "../assets/videos/videos2/Employee_Availibility.mp4";

import gaurdAvail from "../assets/videos/videos2/Guard_availibity.mp4";
import inOutfit from "../assets/videos/videos2/cloth_abusing.mp4";

import conversation from "../assets/videos/videos2/conversation.mp4";
import emptyStation from "../assets/videos/videos2/empty_stations.mp4";
import count from "../assets/videos/videos2/People_count.mp4";
import wastingTime from "../assets/videos/videos2/waisting_time.mp4";
const headings = ["Date", "Day", "Time", "Activity"];
const Stream = () => {
  const { display } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [currentData, setCurrentData] = useState(guardActivity);
  const data = [
    ...wastTime,
    ...peopleCount,
    ...guardActivity,
    ...employeeAvailibility,
    ...emptyWorkstation,
    ...convData,
    ...clothAbusing,
  ];

  console.log("Data is ", data, " length is ", data.length);
  const media = [
    {
      media: gaurdAvail,
      logs: guardActivity,
    },
    {
      media: employeAval,
      logs: employeeAvailibility,
    },
    {
      media: inOutfit,
      logs: clothAbusing,
    },
    {
      media: conversation,
      logs: convData,
    },
    {
      media: emptyStation,
      logs: emptyWorkstation,
    },
    {
      media: count,
      logs: peopleCount,
    },
    {
      media: wastingTime,
      logs: wastTime,
    },
  ];
  const videosPerPage = display === 1 ? 1 : 4;
  const totalPages = Math.ceil(media.length / videosPerPage);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = media.slice(indexOfFirstVideo, indexOfLastVideo);

  const gridStyle = {
    1: "col-md-12",
    2: "col-md-6",
    3: "col-md-4",
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [display]);
  useEffect(() => {
    setIndex(currentPage - 1);
  }, [currentPage]);

  useEffect(() => {
    setCurrentData(media[index].logs);
  }, [index]);

  console.log("currentData is", currentData, "index is ", index);
  return (
    <>
      <div className="row g-3 cameraCardsWrapper">
        {currentVideos.length > 0 ? (
          currentVideos.map((stream, index) => (
            <div
              key={`${currentPage}-${index}`} // Ensure unique key per page
              className={`h-50 ${gridStyle[display]} ${
                display === 1 ? "h-100" : ""
              } ${display === 1 ? "h-96" : ""}`}
            >
              <Camera
                cameraId={indexOfFirstVideo + index + 1}
                src={stream.media}
              />
            </div>
          ))
        ) : (
          <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <h4 className="text-white">No stream found...</h4>
            <p className="text-white">
              Click on playback and publish your first stream
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center gap-3 align-items-center mt-3">
        <div
          role="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="rounded-circle p-1 border-none bgPrimary cursor-pointer"
        >
          <ArrowLeft className="text-white" />
        </div>
        <span className="text-white">
          {currentPage} of {totalPages}
        </span>
        <div
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded-circle p-1 border-none bgPrimary cursor-pointer"
        >
          <ArrowRight className="text-white" />
        </div>
      </div>

      <div className="row g-0 mt-2 activityTableOuter">
        <Table headings={headings} data={data} />
      </div>
    </>
  );
};

export default Stream;
