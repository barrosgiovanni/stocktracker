import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import StockPage from "./pages/StockPage";
import { AppProvider } from "./context/AppContext";

function App() {

  return (
    <AppProvider>
      <div className="app container">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/stock/:stock' element={<StockPage />} />
            </Routes>
          </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
