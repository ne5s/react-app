import "./App.css";
import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";
import { useEffect, useState } from "react";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { HeaderStyled } from "./HeaderStyled";
import { Create } from "./Create";
import { Article } from "./Article";
import { Nav } from "./Nav";

function Read(props){
  const params = useParams();
  const id = Number(params.topic_id);
  const [topic,setTopic] = useState({title:null, body:null});
  useEffect(()=>{    
    (async ()=>{
      const resp = await fetch('http://localhost:3333/topics/'+id);
      const data = await resp.json();
      setTopic(data);
    })();
  },[id]);
  
  return <Article title={topic.title} body={topic.body}></Article>
}
function Control(props){
  const params = useParams();
  const id = Number(params.topic_id);
  let contextUI = null;
  if(id){
    contextUI = <>
      <Button variant="outlined">Update</Button>
      <Button variant="outlined" onClick={()=>{props.onDelete(id);}}>Delete</Button>
    </>
  } 
  return <>
    <Button component={Link} to="/create" variant="outlined">Create</Button>        
    {contextUI}
  </>
}
function App() {
  const [mode,setMode] = useState('WELCOME'); // todo 삭제 예정
  const [id, setId] = useState(null); // todo 삭제 예정
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
  ]);
  const refreshTopics = async () => {
    const resp = await fetch('http://localhost:3333/topics');
    const data = await resp.json();
    setTopics(data);
  }
  useEffect(()=>{    
    refreshTopics();
  },[]);
  const navigate = useNavigate();
  return (
    <div>
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics}  onSelect={navHandler()}></Nav>
      <Routes>
        <Route path="/" element={<Article title="Welcome" body="Hello, WEB!"></Article>}></Route>
        <Route path="/create" element={<Create onCreate={onCreateHandler}></Create>}></Route>
        <Route path="/read/:topic_id" element={<Read topics={topics}></Read>}></Route>
      </Routes>
      <Routes>
        {['/','/read/:topic_id', '/update/:topic_id'].map(path=>{
          return <Route key={path} path={path} element={<Control onDelete={(id)=>{
            deleteHandler(id);
          }}></Control>}></Route>
        })}
      </Routes>
    </div>
  );
  async function onCreateHandler(title, body) {
    const resp = await fetch('http://localhost:3333/topics', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, body})
    })
    const data = await resp.json();
    navigate(`/read/${data.id}`);
    refreshTopics();
  }

  function navHandler() {
    return (id) => {
      setMode('READ');
      setId(id);
    };
  }

  function deleteHandler(id) {
    const newTopics = topics.filter((e) => {
      if (e.id === id) {
        return false;
      } else {
        return true;
      }
    });    
    setTopics(newTopics);
    navigate('/');
  }

  function createHandler() {
    return () => {
      setMode('CREATE');
    };
  }

  function headerHandler() {
    return () => {
      setMode('WELCOME');
    };
  }
}

export default App;
