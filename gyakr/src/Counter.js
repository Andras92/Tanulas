import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const decreaseCount = () => {
    setCount(parseInt(count - 1));
  };
  const increseCount = () => {
    setCount(parseInt(count + 1));
  };
  const zeroCount = () => {
    setCount(0);
  };

  return (
    <div>
      <button onClick={decreaseCount}>-</button>
      <h1>{count}</h1>
      <button onClick={increseCount}>+</button>
      <button onClick={zeroCount}>Nullázó</button>
    </div>
  );
};

export default Counter;
