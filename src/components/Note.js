import React from "react";
import { Alert } from "reactstrap";

const Note = props => {
  return (
    <Alert
      color={props.color}
      className="float-right fixed-bottom"
      style={{ left: "auto", top: "auto" }}
    >
      {props.message}
    </Alert>
  );
};
export default Note;
