import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className={props.className}>
      <h1>
        <Link
          to="/"
          onClick={(evt) => {
            console.log("evt", evt);
            props.onSelect();
          }}
        >
          WWW
        </Link>
      </h1>
    </header>
  );
}

const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
`;

function Nav(props) {
  // console.log(props.data);
  const list = props.data.map((e) => {
    return (
      <li key={e.id}>
        <Link
          to={"/read/" + e.id}
          onClick={(evt) => {
            props.onClick(e.id);
          }}
        >
          {e.title}
        </Link>
      </li>
    );
  });
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          const title = evt.target.title.value;
          const body = evt.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

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
      <HeaderStyled
        onSelect={() => {
          // mode = "WELCOME";
          setMode("WELCOME");
        }}
      ></HeaderStyled>
      <Nav
        data={topics}
        onClick={(id) => {
          // mode = "READ";
          setMode("READ");
          setId(id);
        }}
      ></Nav>
      {content}
      <br></br>
      <ButtonGroup>
        <Button
          component={Link}
          to="/create"
          variant="outlined"
          onClick={() => {
            setMode("CREATE");
          }}
        >
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button
        variant="outlined"
        onClick={() => {
          const newTopics = topics.filter((e) => {
            if (e.id === id) {
              return false;
            } else {
              return true;
            }
          });
          setTopics(newTopics);
          setMode("WELCOME");
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export default App;
