import "./App.css";

function HeaderTag() {
  return (
    <header>
      <h1>
        <a href="/">Web</a>
      </h1>
    </header>
  );
}

function App() {
  return (
    <div>
      <HeaderTag></HeaderTag>
      <HeaderTag></HeaderTag>
      <HeaderTag></HeaderTag>
      <HeaderTag></HeaderTag>
      <nav>
        <ol>
          <li>
            <a href="/read/1">html</a>
          </li>
          <li>
            <a href="/read/2">css</a>
          </li>
        </ol>
      </nav>
      <article>
        <h2>Welcome</h2>
        Hello, WEB!
      </article>
    </div>
  );
}

export default App;
