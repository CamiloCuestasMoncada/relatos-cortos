//import logo from './logo.svg';
import "./App.css";
import './index.css';

import Relatos from "./components/Relatos";


function App() {
 
  return (
    <div className="container p-4">
      <div className="row">
        <Relatos collection="Laberinto"/>
        <Relatos collection="linea"/>
        <Relatos collection="navio"/>
        <Relatos collection="simple"/>
      </div>
    </div>
  );
}

export default App;
