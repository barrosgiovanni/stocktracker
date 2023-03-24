import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

function StockDetails({ symbol}) {

  const [stockData, setStockData] = useState({});

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get('stock/profile2', {
            params: {
              symbol: symbol
            }
        })
        if (isMounted) {
          setStockData(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);


  return (
    <div>StockDetails</div>
  )
}

export default StockDetails;

// {
//   "country": "US",
//   "currency": "USD",
//   "exchange": "NASDAQ/NMS (GLOBAL MARKET)",
//   "ipo": "1980-12-12",
//   "marketCapitalization": 1415993,
//   "name": "Apple Inc",
//   "phone": "14089961010",
//   "shareOutstanding": 4375.47998046875,
//   "ticker": "AAPL",
//   "weburl": "https://www.apple.com/",
//   "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
//   "finnhubIndustry":"Technology"
// }
