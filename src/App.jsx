import React from 'react';
import { Outlet, Link } from 'react-router-dom'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <Link to="/" className="header-title">
          Bazar Universal
        </Link>
      </header>
      
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;