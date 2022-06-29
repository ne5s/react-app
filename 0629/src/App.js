import "./App.css";
import { Header } from "./Header";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Welcome } from "./Welcome";
import { Nav } from "./Nav";
import { Create } from "./Create";

function Read() {
  const params = useParams();
  const id = Number(params.id);
  const [topic, setTopic] = useState({ title: null, body: null });
  async function refresh() {
    const resp = await fetch("http://localhost:3333/topics/" + id);
    const data = await resp.json();
    setTopic(data);
  }
  useEffect(() => {
    refresh();
  }, [id]);
  return (
    <article>
      <h2>{topic.title}</h2>
      {topic.body}
    </article>
  );
}

function Control() {
  const params = useParams();
  const id = Number(params.id);
  let contextUI = null;
  if (id) {
    contextUI = (
      <>
        <li>
          <Link to={`/update/${id}`}>Update</Link>
        </li>
      </>
    );
  }
  return (
    <ul>
      <li>
        <Link to="/create">Create</Link>
        {contextUI}
      </li>
    </ul>
  );
}
function App() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  async function refresh() {
    const resp = await fetch("http://localhost:3333/topics");
    const data = await resp.json();
    setTopics(data);
  }
  useEffect(() => {
    refresh();
  }, []);
  async function createHandler(title, body) {
    const resp = await fetch("http://localhost:3333/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const data = await resp.json();
    navigate(`/read/${data.id}`);
    refresh();
  }
  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Routes>
        <Route path="/" element={<Welcome></Welcome>}></Route>
        <Route path="/read/:id" element={<Read></Read>}></Route>
        <Route
          path="/create"
          element={<Create onCreate={createHandler}></Create>}
        ></Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Control></Control>}></Route>
        <Route path="/read/:id" element={<Control></Control>}></Route>
      </Routes>
    </div>
  );
}

export default App;
