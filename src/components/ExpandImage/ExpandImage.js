import React from "react";
import { useEffect, useCallback } from "react/cjs/react.development";
import "./ExpandImage.css";
import { Snackbar } from "@mui/material";

export const ExpandImage = ({ imageUrl, exit }) => {
  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    console.log("expand component reporting", imageUrl);
    handleClick({
      vertical: "top",
      horizontal: "center",
    });
  }, []);
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      //Do whatever when esc is pressed
      exit(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  return (
    <div className="expand-image-container">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message="Pres ESC to exit"
        key={vertical + horizontal}
      />
      <div className="background" onClick={() => exit(false)}></div>
      <img className="expandImage" src={imageUrl} />
    </div>
  );
};
