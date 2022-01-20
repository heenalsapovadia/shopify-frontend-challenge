import React, { useState } from "react";
import "./Card.css";
import { saveAs } from "file-saver";
import { BsHeart, BsDownload, BsArrowsAngleExpand } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
const Card = ({ imageMetaData, expandImage }) => {
  return (
    <div className="card-container">
      <h1 className="card-title">{imageMetaData.title}</h1>
      <p className="card-date">{imageMetaData.date}</p>
      <img
        className="card-image"
        src={imageMetaData.url}
        alt={imageMetaData.explanation}
      />
      <div className="actions">
        <Tooltip title="Comment">
          <div className="action comment">
            {/* <span className="hover-bg"></span> */}
            <FaRegComment className="action-icon comment" />
            <span></span>
          </div>
        </Tooltip>
        <Tooltip title="like" TransitionComponent={Zoom}>
          <div className="action like">
            {/* <span className="hover-bg"></span> */}
            <BsHeart className="action-icon like" />
            <span></span>
          </div>
        </Tooltip>
        <Tooltip title="Expand">
          <div className="action expand ">
            <BsArrowsAngleExpand
              className="action-icon download"
              onClick={() => expandImage(imageMetaData.hdurl)}
            />
          </div>
        </Tooltip>
      </div>
      <p className="card-explanation">{imageMetaData.explanation}</p>
      {imageMetaData?.copyright && (
        <p className="card-copyright">&copy; {imageMetaData?.copyright}</p>
      )}
    </div>
  );
};

export default Card;
