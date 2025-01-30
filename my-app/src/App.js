
import './App.css';
import Users from './components/Users';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
 
 <Routes>
 <Route path="/" element={<Navigate to="/users" />} />
 <Route path="/users" element={<Users />} />
 </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
