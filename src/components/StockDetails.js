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
    shareOutstanding
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
