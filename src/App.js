import "./App.css";

function Header() {
  return (
    <header>
      <h1>
        <a href="/">Web</a>
      </h1>
    </header>
  );
}

function Nav(props) {
  console.log(props.data);
  const list = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a href={"/read/" + e.id}>{e.title}</a>
      </li>
    );
  });
  // const list = [
  //   <li>
  //     <a href="/read/1">{props.data[0].title}</a>
  //   </li>,
  //   <li>
  //     <a href="/read/2">{props.data[1].title}</a>
  //   </li>,
  // ];
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
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ];
  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB!"></Article>
      <Article title="HTML" body="HTML is ..."></Article>
    </div>
  );
}

export default App;
