import React from "react";
import { useStore } from "../context/Context";
import Camera from "../components/Camera";
import Table from "../components/Table";

const headings = ["Time", "Activity", "Camera"];
const Stream = () => {
  const { display, media } = useStore();
  const gridStyle = {
    1: "col-md-12",
    2: "col-md-6",
    3: "col-md-4",
  };
  console.log("re-rendering...");
  return (
    <>
      <div className="row g-3 cameraCardsWrapper">
        {media.length > 0 ? (
          media.map((stream, index) => (
            <div
              key={index}
              className={`  h-50 ${gridStyle[display]} ${
                display === 1 ? "h-100" : ""
              } ${display === 1 ? "h-96" : ""}`}
            >
              <Camera cameraId={++index} stream={stream} />
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
      <div className="row g-0  mt-2 activityTableOuter">
        <Table headings={headings} />
      </div>
    </>
  );
};

export default Stream;
