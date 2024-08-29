import React from "react";
import { useStore } from "../context/Context";

const SearchBar = () => {
  const { setRtsp, rtsp, publishStream } = useStore();
  return (
    <div className="d-flex w-100 gap-2 align-items-center">
      <div className="searchBar  w-75">
        <input
          type="search"
          placeholder="Enter your RTSP here"
          className="form-control "
          value={rtsp}
          onChange={(e) => setRtsp(e.target.value)}
        />
      </div>
      <div
        className="d-flex bgMain  text-white cursor-pointer py-2 px-3 rounded align-items-center"
        onClick={publishStream}
      >
        Publish
      </div>
    </div>
  );
};

export default SearchBar;
