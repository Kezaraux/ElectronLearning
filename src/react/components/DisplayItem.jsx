import React from "react";

import folder from "../folder.svg";

const DisplayItem = ({ item, onClick }) => {
  const display = item.directory ? (
    <div>
      <img src={folder} alt="folder" />
      <p>{item.item}</p>
    </div>
  ) : (
    <p>{item.item}</p>
  );
  return <div onClick={() => onClick(item)}>{display}</div>;
};

export default DisplayItem;
