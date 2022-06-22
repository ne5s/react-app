import "./App.css";
import {useSelector, useDispatch} from 'react-redux'
import countUp, {up} from './countUpSlice';
import countDown from './countDownSlice';
import { useEffect } from 'react'
function Left1(props) {
  return (
    <div>
      <h1>Left1</h1>
      <Left2></Left2>
    </div>
  );
}
function Left2(props) {
  return (
    <div>
      <h1>Left2</h1>
      <Left3></Left3>
    </div>
  );
}
function Left3(props) {
  const dispatch = useDispatch();
  const countUpValue = useSelector(state=>state.countUp.value);

  // actionCreator
  // function up(step) {
  //   return {type:'countUp/up', payload:step}
  // }
  return (
    <div>
      <h1>Left3</h1>
      {/* <button
        onClick={() => {
          // reduex시
          // dispatch({type:'UP', step:2})
          // dispatch(countUp.actions.up(2));
          // dispatch({type:'countUp/up', payload:2})
          // dispatch(up(2));
          
          // dispatch(countUp.actions.up(2));
          dispatch(up(2));
        }}
      >
        +
      </button> */}
      <button
        onClick={async () => {
          const resp = await fetch('http://localhost:3333/countUp', {
            method:'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({value:countUpValue+1}), 
          });
          const result = await resp.json();
          dispatch(countUp.actions.up(1));
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          // reduex시
          // dispatch({type:'UP', step:2})
          // dispatch(countUp.actions.up(2));
          // dispatch({type:'countUp/up', payload:2})
          // dispatch(up(2));
          dispatch(countDown.actions.down(2));
        }}
      >
        -
      </button>
    </div>
  );
}
function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}
function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}
function Right3(props) {
  const countUpValue = useSelector(state=>{
    return state.countUp.value;
  })
  const countDownValue = useSelector(state => {
    return state.countDown.value;
  })
  return (
    <div>
      <h1>Right3</h1>
      {countUpValue} | {countDownValue}
    </div>
  );
}
export default function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    (async ()=>{
      const resp = await fetch('http://localhost:3333/countUp');
      const result = await resp.json();
      dispatch(countUp.actions.set(result.value));
    })()
  },[]);
  return (
    <div id="app">
      <h1>Root</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <Left1></Left1>
        <Right1></Right1>
      </div>
    </div>
  );
}