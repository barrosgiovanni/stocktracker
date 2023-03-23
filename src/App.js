import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import StockPage from "./pages/StockPage";
import { AppProvider } from "./context/AppContext";
import './App.css';

function App() {

  return (
    <AppProvider>
      <div className="app container my-5">
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
