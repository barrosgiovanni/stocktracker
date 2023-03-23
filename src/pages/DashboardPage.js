import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";

function DashboardPage() {
  return (
    <div>
      <Logo />
      <SearchBar />
      <StockList />
    </div>
  )
}

export default DashboardPage;
