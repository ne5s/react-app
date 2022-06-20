import { useState, useEffect } from 'react'
import {Link, Routes, Route, useParams} from 'react-router-dom';

function Header() {
    return <header><h1><Link to='/'>WEB</Link></h1></header>
}

function Nav(props) {
  return <nav><ol>{props.data.map(e=>{
    return <li key={e.id}><Link to={`/read/${e.id}`}>{e.title}</Link></li>
  })}</ol></nav>
}
function Read(props) {
  const param = useParams();
  const id = Number(param.id);
  const [topic, setTopic] = useState({title:null, body:null});
  const refreshTopic = async () => {
    const res = await fetch('http://localhost:3333/topics/' + id);
    const result = await res.json();
    setTopic(result);
  }
  useEffect(()=>{
    refreshTopic();
  }, [id]);
  return <article>
    <h2>{topic.title}</h2>
    {topic.body}
  </article>
}
function App() {
  const [topics, setTopics] = useState([]);
  const refreshTopics = async () => {
    const res = await fetch('http://localhost:3333/topics');
    const result = await res.json();
    setTopics(result);
  }
  useEffect(()=>{
    refreshTopics();
  }, []);
  console.log(topics);
  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Routes>
        <Route path="/" element={<><h2>Welcome</h2>Hello, React!</>} />
        <Route path="/read/:id" element={<Read></Read>} />
      </Routes>
    </div>
  );
}

export default App;
