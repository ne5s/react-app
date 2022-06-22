// redux만 썼을 때 store 구성
// import {createStore}from "redux";
// const reducer = (state, action) => {
//     if(action.type === 'UP') {
//         return {...state, value:state.value + action.step};
//     }
//     return state;
// }
// const initialState = {
//     value : 0
// }
// const store = createStore(reducer, initialState);
// export default store;

// redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import counterUp from "./countUpSlice";
import countDown from "./countDownSlice";
const store = configureStore({
  reducer: {
    countUp: counterUp.reducer,
    countDown: countDown.reducer
  }
});
export default store;