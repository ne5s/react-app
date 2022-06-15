import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HeaderStyled } from "./HeaderStyled";
import { Nav } from "./Nav";
import { Article } from "./Article";
import { Create } from "./Create";

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  console.log(mode, id);
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ]);
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>;
  } else if (mode === "READ") {
    const topic = topics.filter((e) => {
      if (e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    content = <Article title={topic.title} body={topic.body}></Article>;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body };
          // topics.push(newTopic);
          // setTopics(topics);
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setId(nextId);
          setMode("READ");
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  }

  return (
    <div>
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics} onClick={navHandler()}></Nav>
      {content}
      <br></br>
      <ButtonGroup>
        <Button
          component={Link}
          to="/create"
          variant="outlined"
          onClick={createHandler()}
        >
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined" onClick={deleteHandler()}>
        Delete
      </Button>
    </div>
  );

  function navHandler() {
    return (id) => {
      setMode("READ");
      setId(id);
    };
  }

  function deleteHandler() {
    return () => {
      const newTopics = topics.filter((e) => {
        if (e.id === id) {
          return false;
        } else {
          return true;
        }
      });
      setTopics(newTopics);
      setMode("WELCOME");
    };
  }

  function createHandler() {
    return () => {
      setMode("CREATE");
    };
  }

  function headerHandler() {
    return () => {
      setMode("WELCOME");
    };
  }
}

export default App;
