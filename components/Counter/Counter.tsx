import React, { useState } from "react";
import styles from "./counter.module.css";

export function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className={styles.counterContainer}>
      <h1 className={styles.counterTitle}>Counter</h1>
      <p className={styles.counterValue}>{count}</p>
      <div className={styles.buttonGroup}>
        <button onClick={increment} className={styles.button}>
          Increment
        </button>
        <button onClick={decrement} className={styles.button}>
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
