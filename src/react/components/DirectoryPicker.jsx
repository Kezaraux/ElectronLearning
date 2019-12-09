import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FileDisplay from "./FileDisplay";
const { ipcRenderer } = window.require("electron");

const DirectoryPicker = () => {
  const [dir, setDir] = useState("");
  useEffect(() => {
    ipcRenderer.on("dirReply", (event, arg) => {
      console.log("SETTING DIR");
      console.log(arg);
      if (arg.canceled) {
        return;
      }
      setDir(arg.filePaths[0]);
    });
  }, []);

  const chooseDir = () => {
    ipcRenderer.send("getDir", "test");
  };
  return (
    <div>
      <Form>
        <Form.Row>
          <Col>
            <Form.Control value={dir} readOnly />
          </Col>
          <Button variant="primary" onClick={chooseDir}>
            Select Directory
          </Button>
        </Form.Row>
      </Form>
      <FileDisplay path={dir} />
    </div>
  );
};

export default DirectoryPicker;
