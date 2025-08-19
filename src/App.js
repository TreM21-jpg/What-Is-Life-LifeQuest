import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card,CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Welcome to LifeQuest 🚀
        </h1>
        <p>
          A Journey through Life
       </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
