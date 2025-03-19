import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2025 My React App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;