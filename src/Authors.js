import React, { useState, useEffect } from "react";
import axios from "axios";

function Authors() {
  const [entries, updateEntries] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://192.168.99.100:8080/api/collections/get/authors?sort[name]=1"
      )
      .then(res => updateEntries(res.data.entries));
  }, []);

  return (
    <div>
      {entries.map(entry => (
        <div key={entry._id}>
          <img
            src={entry.avatar.path}
            alt={entry.name}
            style={{ display: "block", width: 150 }}
          />
          <strong>{entry.name}</strong>
          <p>{entry.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Authors;
