import { useState, useEffect } from 'react';
import { Link } from "react-router";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null)
  useEffect(() => {
    const getCoinPrice = async () => {
      const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`);
      const json = await response.json();
      setPrice(json);
    }
    getCoinPrice().catch(console.error);
  }, [symbol]);
  return (
    <div>
      {price ? (
        <li className='main-list' key={symbol}>
          <Link
            style={{ color: "White" }}
            to={`/coinDetails/${symbol}`}
            key={symbol}
          >
              <img
                className="icons"
                src={`https://www.cryptocompare.com${image}`}
                alt={`Small icon for ${name} crypto coin`}
              />
              {name}
              {price && price.USD ? ` $${price.USD} USD` : null}
          </Link>
        </li>
      ) : 
      null
      }
    </div>
  );
}

export default CoinInfo

