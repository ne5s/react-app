import "./App.css";
import { Header } from "./Header";
import { Link, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Welcome } from "./Welcome";

function Nav() {
  return (
    <nav>
      <ol>
        <li>
          <Link to="/read/1">html</Link>
        </li>
      </ol>
    </nav>
  );
}

function Read() {
  return (
    <article>
      <h2>Read</h2>
      Hello, Read
    </article>
  );
}

function App() {
  const [topics, setTopics] = useState([]);
  async function refresh() {
    const resp = await fetch("http://localhost:3333/topics");
    const data = await resp.json();
    console.log(data);
    setTopics((topics) => data);
  }
  useEffect(() => {
    refresh();
  }, []);

  const ui = topics.map((e) => <li key={e.id}>{e.title}</li>);
  return (
    <div className="App">
      <Header></Header>
      <Nav></Nav>
      <ol>{ui}</ol>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="read/1" element={<Read />} />
      </Routes>
    </div>
  );
}

export default App;
