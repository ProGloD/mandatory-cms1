import React, { useState, useEffect } from "react";
import MDReactComponent from "markdown-react-js";
import axios from "axios";

function Article(props) {
  const [entry, updateEntry] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://192.168.99.100:8080/api/collections/get/articles?filter[_id]=${props.match.params.id}`
      )
      .then(res => updateEntry(res.data.entries[0]));
  }, []);

  return !entry ? (
    <p>Loading...</p>
  ) : (
    <>
      <h2>{entry.title}</h2>
      <p>
        <strong>{`${entry.author.display}`}</strong>
      </p>
      <span>{entry.published_on}</span>
      <MDReactComponent text={`${entry.body}`} />
    </>
  );
}

export default Article;
