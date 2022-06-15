import { Link } from "react-router-dom";

export function Nav(props) {
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
