import "./App.css";
import { Header } from "./Header";
import { Link, Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Welcome } from "./Welcome";

function Nav({ data }) {
  return (
    <nav>
      <ol>
        {data.map((e) => (
          <li key={e.id}>
            <Link to={`/read/${e.id}`}>{e.title}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Read() {
  const params = useParams();
  const id = Number(params.id);
  return (
    <article>
      <h2>Read</h2>
      Hello, Read {id}
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

  return (
    <div className="App">
      <Header></Header>
      <Nav data={topics}></Nav>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="read/:id" element={<Read />} />
      </Routes>
    </div>
  );
}

export default App;
