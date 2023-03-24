import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

function StockDetails({ symbol}) {

  const [stockData, setStockData] = useState({});

  const {
    name,
    ticker,
    country,
    finnhubIndustry,
    exchange,
    ipo,
    marketCapitalization,
    shareOutstanding,
    weburl
  } = stockData;

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
    <div>
      { stockData && (
      <div className="data-box row border bg-white rounded shadow p-4 mt-5">
        <div className="col">
          <div>
            <span className="fw-bold">Name:</span>
            <p>{name}</p>
          </div>
          <div>
            <span className="fw-bold">Symbol:</span>
            <p>{ticker}</p>
          </div>
        </div>
        <div className="col">
          <div>
            <span className="fw-bold">Country:</span>
            <p>{country}</p>
          </div>
          <div>
            <span className="fw-bold">Industry:</span>
            <p>{finnhubIndustry}</p>
          </div>
        </div>
        <div className="col">
          <div>
            <span className="fw-bold">Exchange:</span>
            <p>{exchange}</p>
          </div>
            <div>
            <span className="fw-bold">IPO date:</span>
            <p>{ipo}</p>
          </div>
        </div>
        <div className="col">
          <div>
            <span className="fw-bold">MarketCap:</span>
            <p>{Math.floor(marketCapitalization / 1000)} billion</p>
          </div>
          <div>
            <span className="fw-bold">SharesOutstanding:</span>
            <p>{Math.floor(shareOutstanding)} million</p>
          </div>
        </div>
      </div>)
      }
    </div>
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
