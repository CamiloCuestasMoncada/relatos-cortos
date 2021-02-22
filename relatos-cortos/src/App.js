//import logo from './logo.svg';
import "./App.css";
import './index.css';

import Relatos from "./components/Relatos";
/*import { useEffect, useState } from "react";
import Loading from "./components/Loading";*/

function App() {
 /* const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4500);
  });*/
  return (
    <div className="container p-4">
      <div className="row">
        <Relatos/>
      </div>
    </div>
  );
}

export default App;
