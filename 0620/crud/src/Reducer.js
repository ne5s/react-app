import {useReducer, useState} from 'react';

// function App(){
//     const [count, setCount] = useState(0);
//     return <>
//         <button onClick={()=>setCount((curr) => curr+1)}>+</button>
//         <p>{count}</p>
//     </>
// }
function App() {
    const countReducer = (oldCount, action) => {
        console.log(oldCount, action);
        if(action === 'up') {
            return oldCount + 1;
        } else if(action === 'down') {
            return oldCount - 1;
        }
    }
    const countInitValue = 0;
    const [count, countDispatch] = useReducer(countReducer, countInitValue);
    return <>
        <button onClick={()=>{
            countDispatch('up');
        }}>+</button>
        <button onClick={()=>{
            countDispatch('down');
        }}>-</button>
        <p>{count}</p>
    </>
}
export default App;