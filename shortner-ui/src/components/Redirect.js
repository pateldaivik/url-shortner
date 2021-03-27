import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Redirect = () => {
  const [urlList, setUrlList] = useState(null);

  const onRedirect = (hash) => {
    axios
      .post("http://localhost:5000/api/shortner/redirect", { hash: hash })
      .then((res) => {
        console.log(res.data);
        if (res.data.url) {
          window.open(res.data.url);
        }
      })
      .catch((err) => {
        alert("URL not found");
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/shortner")
      .then((res) => {
        setUrlList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Link to="/" style={{ color: "white" }}>
        Go to the shortner
      </Link>
      <table>
        <th>Name</th>
        <th>Link</th>
        {urlList
          ? urlList.map((link) => {
              return (
                <tr>
                  <td>
                    <label style={{ color: "white" }}>{link.name}</label>
                  </td>
                  <td>
                    <button
                      type="link"
                      onClick={() => onRedirect(link._id)}
                    >{`http://short.link/${link._id}`}</button>
                  </td>
                </tr>
              );
            })
          : null}
      </table>
    </div>
  );
};

export default Redirect;
