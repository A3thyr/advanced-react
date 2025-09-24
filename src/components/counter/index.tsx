import { useState } from "react";
import classes from "./counter.module.scss";

export const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div style={{ marginTop: 100 }}>
      <button onClick={() => setCount(count - 1)}>decrement</button>
      <button
        onClick={() => setCount(count + 1)}
        className={classes.someBtnClass}
      >
        increment
      </button>
      <h1>Count: {count}</h1>
    </div>
  );
};
