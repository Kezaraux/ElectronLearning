import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { Button } from "react-bootstrap";
import DisplayItem from "./DisplayItem";
const { ipcRenderer } = window.require("electron");

const FileDisplay = ({ path }) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    ipcRenderer.on("dirContents", (event, arg) => {
      console.log(arg);
      setFiles(arg);
    });
  }, []);

  const loadFiles = () => {
    console.log("LOAD FILES");
    if (!path) {
      return;
    }
    ipcRenderer.send("getContents", path);
  };

  const clickObject = item => {
    if (!item.directory) {
      console.log("NOT A DIR, RETURN");
      return;
    }
    console.log("SET DIR");
    ipcRenderer.send("setDir", `${path}\\${item.item}`);
  };

  return (
    <div>
      <Button onClick={loadFiles} disabled={!path}>
        Load Files
      </Button>
      <ul>
        {map(files, f => (
          <DisplayItem key={f} item={f} onClick={clickObject} />
        ))}
      </ul>
    </div>
  );
};

export default FileDisplay;
