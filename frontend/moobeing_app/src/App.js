import React from 'react';
import './App.css';
import Router from './Router';
import Home from './pages/HomePage'

function App() {
  return (
    <div className="app-container">
      <Router />
      <Home/>
    </div>
  );
}

export default App;
