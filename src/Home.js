import "./App.css";
import react, { useEffect, useState } from "react";
import Card from "./components/Card";
import { ExpandImage } from "./components/ExpandImage/ExpandImage";

function Home() {
  const [imageMetaData, setImageMetaData] = useState({});

  const [expand, setExpand] = useState(false);
  const [expandUrl, setExpandUrl] = useState("");
  const expandImage = (hdurl) => {
    console.log("expanding image", hdurl);
    setExpandUrl(hdurl);
    setExpand(true);
  };

  useEffect(() => {
    // GET request using fetch with error handling
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=NORD19fYTkCDcpXCmCJY0s8gfKJmdaWePjNhNC2F"
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
        setImageMetaData({ copyright, date, explanation, hdurl, url });
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        {expand ? <ExpandImage imageUrl={expandUrl} exit={setExpand} /> : null}
        <Card imageMetaData={imageMetaData} expandImage={expandImage} />
      </div>
    </div>
  );
}

export default Home;
