import React, { useState } from 'react';


function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Counter</h1>
        <p>Current Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </header>
    </div>
  );
}

export default App;
