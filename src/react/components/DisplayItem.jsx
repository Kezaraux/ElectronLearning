import React, { Fragment } from "react";

import "./DisplayItem.css";
import folder from "../folder.png";
import file from "../file.png";

const DisplayItem = ({ item, click, doubleClick, isActive }) => {
  const display = item.directory ? (
    <Fragment>
      <img src={folder} alt="folder" />
      <span className="caption">{item.item}</span>
    </Fragment>
  ) : (
    <Fragment>
      <img src={file} alt="file" />
      <span className="caption">{item.item}</span>
    </Fragment>
  );
  return (
    <div
      onClick={() => click(item)}
      onDoubleClick={() => doubleClick(item)}
      className={`item ${isActive ? "item-active" : null}`}
    >
      {display}
    </div>
  );
};

export default DisplayItem;
