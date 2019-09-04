import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from "./Main";
import Article from "./Article";
import Authors from "./Authors";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Main} />
        <Route path="/articles/:id" component={Article} />
        <Route path="/authors" component={Authors} />
      </div>
    </Router>
  );
}

export default App;
