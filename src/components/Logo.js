import logo from "../images/stocktrackerlogo.png";

function Logo() {
  return (
    <div className='logo-box d-flex justify-content-center'>
      <img src={logo} alt='StockTracker logo' width={350} />
    </div>
  )
}

export default Logo;
