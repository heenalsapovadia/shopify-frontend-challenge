import "./App.css";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { ExpandImage } from "./components/ExpandImage/ExpandImage";
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Snackbar, Alert } from "@mui/material";
function App() {
  const [imageMetaData, setImageMetaData] = useState([]);
  const [expand, setExpand] = useState(false);
  const [expandUrl, setExpandUrl] = useState("");
  const [value, setValue] = React.useState(null);
  const [error, setError] = useState(false);
  const vertical = "top";
  const horizontal = "center";
  const handleClick = () => () => {
    console.log("eroor invalid date");
    setError(true);
  };
  const handleClose = () => {
    setError(false);
  };
  const expandImage = (hdurl) => {
    console.log("expanding image", hdurl);
    setExpandUrl(hdurl);
    setExpand(true);
  };
  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2022-01-04");
  useEffect(() => {
    console.log(startDate, endDate);

    if (
      startDate.split("-")[0] <= endDate.split("-")[0] &&
      startDate.split("-")[1] <= endDate.split("-")[1] &&
      startDate.split("-")[2] <= endDate.split("-")[2]
    ) {
      fetchData();
    } else {
      alert("Please select valid date");
      // handleClick();
    }
  }, [startDate, endDate]);

  const fetchData = () => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=NORD19fYTkCDcpXCmCJY0s8gfKJmdaWePjNhNC2F" +
        "&start_date=" +
        startDate +
        "&end_date=" +
        endDate
    )
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        let { copyright, date, explanation, hdurl, url } = data;
        setImageMetaData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    // GET request using fetch with error handling
    fetchData();
  }, []);

  return (
    <div className="App">
      <Snackbar
        open={error}
        autoHideDuration={1000}
        onClose={handleClose}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid Date
        </Alert>
      </Snackbar>
      <div className="date-picking">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue.toISOString().split("T")[0]);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue.toISOString().split("T")[0]);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      {imageMetaData.length == 0 ? (
        <span className="loader">
          <CircularProgress />
        </span>
      ) : (
        <>
          <p>hello</p>
          {expand ? (
            <ExpandImage imageUrl={expandUrl} exit={setExpand} />
          ) : null}
          <div className="container">
            {imageMetaData.map((image) => {
              console.log("haha", image);
              return <Card imageMetaData={image} expandImage={expandImage} />;
            })}
          </div>
        </>
      )}
      <span className="footer">
        Made with <span style={{ color: "red", margin: "5px" }}>&hearts;</span>
        by{" "}
        <a
          href="https://www.linkedin.com/in/heenal-sapovadia/"
          target="_blank"
          style={{ margin: "5px", color: "white" }}
        >
          Heenal Sapovadia
        </a>
      </span>
    </div>
  );
}

export default App;
