import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const array = [1, 2, 5, 10];

function Main() {
  const [entries, updateEntries] = useState([]);
  const [limit, updateLimit] = useState(5);
  const [page, updatePage] = useState(1);
  const [maxPage, updateMaxPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `http://192.168.99.100:8080/api/collections/get/articles?sort[published_on]=-1&limit=${limit}&skip=${limit *
          page -
          limit}`
      )
      .then(res => {
        let data = res.data;
        updateEntries(data.entries);
        updateMaxPage(
          data.total % limit === 0
            ? data.total / limit
            : Math.floor(data.total / limit) + 1
        );
      });
  }, [limit, page]);

  if (page > maxPage) {
    updatePage(maxPage);
  }

  return (
    <>
      <h1>Articles</h1>
      <div>
        Show{" "}
        <select onChange={e => updateLimit(e.target.value)} value={limit}>
          {array.map(number => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <table>
        <tbody>
          {entries.map(entry => (
            <tr key={entry._id}>
              <td>
                <Link to={`/articles/${entry._id}`}>{entry.title}</Link>
              </td>
              <td>{entry.author.display}</td>
              <td>{entry.published_on}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => updatePage(1)}>&lt;&lt;</button>
        <button onClick={() => updatePage(page === 1 ? page : page - 1)}>
          &lt;
        </button>
        <input
          type="number"
          onChange={e => updatePage(e.target.value)}
          min="1"
          max={maxPage}
          value={page}
        />
        /{maxPage}
        <button onClick={() => updatePage(page === maxPage ? page : page + 1)}>
          &gt;
        </button>
        <button onClick={() => updatePage(maxPage)}>&gt;&gt;</button>
      </div>
    </>
  );
}

export default Main;
