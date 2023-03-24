import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";
import { useGlobalContext } from "../context/AppContext";

function DashboardPage() {

  const {setSearchTerm} = useGlobalContext();
  
  return (
    <div onClick={() => setSearchTerm('')}>
      <Logo />
      <SearchBar />
      <StockList />
    </div>
  )
}

export default DashboardPage;
