import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import { clear } from "@testing-library/user-event/dist/clear";

function App() {
  const [state, setState] = useState(0);
  const [count, setCount] = useState(0);
  // console.log(state.num);
  useEffect(() => {
    // timer();
    // return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    console.log(state, "useEffect");
  }, [state]);

  const increase = () => {
    const counting = count + 1;
    setCount(counting);
    console.log(count, "count");
    if (count == 10) {
      // let incr = { num: state.num + 1 };
      setState(state + 1);
      setCount(0);
      clearInterval(timer);
    }
  };
  const decrease = () => {
    // let decr = { num: state.num - 1 };
    setState(state - 1);
  };
  let inter = 0;
  const timer = setInterval(() => {
    inter++;
    console.log(inter);
    if (inter == 10) {
      setState(state + 1);
      inter = 0;
      clearInterval(timer);
    }
  }, 2000);

  return (
    <>
      LV : {state}
      <br />
      Count : {count}
      <br />
      <br />
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
    </>
  );
}

export default App;
