import React from "react";
import axios from "axios";
import validator from "validator";
import { useState } from "react";
import { Link } from "react-router-dom";
const Shorten = () => {
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(url, {
      require_protocol: true,
    });
    if (!validURL) {
      alert(
        "Please ensure the url is correct and includes the http(s) protocol."
      );
    } else {
      console.log("URL is: ", url);
      // Post values
      axios
        .post("http://localhost:5000/api/shortner", {
          url: url,
          name: name,
        })
        .then((res) => {
          setLink(`http://short.link/${res.data.hash}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div className="body-wrap">
      <header>
        <h1>
          <span className="highlight">short</span>
          <span className="highlight">.</span>link
        </h1>
        <small>...free and always will be.</small>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input
              required
              type="text"
              name="url"
              placeholder="Enter Name to define the URL"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="url"
              placeholder="Enter URL including the http(s) protocol"
              onChange={handleChange}
            />
            <input type="submit" value="shorten" />
          </fieldset>
          <br />
          <fieldset className={link !== "" ? "display-result" : "hide-result"}>
            <span id="result">{link}</span>
          </fieldset>
          <Link to="/redirect" style={{ color: "white" }}>
            Go to the list
          </Link>
        </form>
      </main>
    </div>
  );
};

export default Shorten;
