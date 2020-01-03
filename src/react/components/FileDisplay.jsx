import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { Button } from "react-bootstrap";
import DisplayItem from "./DisplayItem";
const { ipcRenderer } = window.require("electron");

const FileDisplay = ({ path }) => {
  const [files, setFiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
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

  const selectObject = item => {
    if (selectedItem === item.item) {
      console.log("Clicked selected item");
      return;
    }
    if (!item.directory) {
      console.log("NOT A DIR, RETURN");
      return;
    }
    console.log("SET DIR");
    ipcRenderer.send("setDir", item.item);
    setSelectedItem(item.item);
  };

  const activateObject = item => {
    console.log("Test", item);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 p-0">
          <Button onClick={loadFiles} disabled={!path}>
            Load Files
          </Button>
        </div>
        <div className="col-10">
          <div className="container-fluid">
            <div className="row">
              {map(files, f => (
                <DisplayItem
                  key={f.item}
                  item={f}
                  click={selectObject}
                  doubleClick={activateObject}
                  isActive={f.item === selectedItem}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDisplay;
