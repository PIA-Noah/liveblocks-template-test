import React, { useState } from 'react';

export function Counter() {
  // Utilisation du hook useState pour gérer l'état du compteur
  const [count, setCount] = useState(0);

  // Fonction pour incrémenter le compteur
  const increment = () => {
    setCount(count + 1);
  };

  // Fonction pour décrémenter le compteur
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Counter</h1>
      <p style={{ fontSize: '24px' }}>{count}</p>
      <div>
        <button onClick={increment} style={{ marginRight: '10px' }}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
