import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import StockPage from "./pages/StockPage";

function App() {

  return (
    <div className="app container">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/stock/:stock' element={<StockPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
