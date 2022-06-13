import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";

function Header(props) {
  const myStyle = {
    borderBottom: "1px solid gray",
    padding: "10px",
    fontSize: "20px",
  };
  return (
    <header style={myStyle}>
      <h1>
        <a
          href="/"
          onClick={(evt) => {
            console.log("evt", evt);
            evt.preventDefault();
            props.onSelect();
          }}
        >
          WWW
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  // console.log(props.data);
  const list = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a
          href={"/read/" + e.id}
          onClick={(evt) => {
            evt.preventDefault();
            props.onClick(e.id);
          }}
        >
          {e.title}
        </a>
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

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  console.log(mode, id);
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ];
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
  }

  return (
    <div>
      <Header
        onSelect={() => {
          // mode = "WELCOME";
          setMode("WELCOME");
        }}
      ></Header>
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
          variant="outlined"
          onClick={() => {
            alert("create!");
          }}
        >
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
    </div>
  );
}

export default App;
