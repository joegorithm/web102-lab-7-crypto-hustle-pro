import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CoinChart from "./CoinChart";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinDetail() {
    const { symbol } = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const getCoinDetail = async () => {
            const details = await fetch(
                `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
            );
            const description = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`
            );

            const detailsJson = await details.json();
            const descripJson = await description.json();

            setFullDetails({
                numbers: detailsJson.DISPLAY,
                textData: descripJson.Data
            });
        }

        getCoinDetail().catch(console.error);
    }, [symbol]);

    return (
        <div className="coin-detail">
            <h1 className="coin-title">{fullDetails?.textData?.[symbol]?.FullName}</h1>

            <div className="coin-header">
              <img
                className="images"
                src={`https://www.cryptocompare.com${fullDetails?.numbers?.[symbol]?.USD?.IMAGEURL ?? ''}`}
                alt={`Small icon for ${symbol} crypto coin`}
              />
              <div className="coin-meta">
                <div className="coin-description">{fullDetails?.textData?.[symbol]?.Description}</div>
                <div className="coin-algo">Algorithm: {fullDetails?.textData?.[symbol]?.Algorithm ?? 'N/A'}</div>
              </div>
            </div>

            <table className="coin-stats-table">
            <tbody>
                <tr>
                <th>Launch Date </th>
                <td>{fullDetails?.textData?.[symbol]?.AssetLaunchDate ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Website </th>
                <td>
                  {fullDetails?.textData?.[symbol]?.Website ? (
                    <a href={fullDetails.textData[symbol].Website} target="_blank" rel="noreferrer">
                      Visit
                    </a>
                  ) : 'N/A'}
                </td>
                </tr>
                <tr>
                <th>Whitepaper </th>
                <td>
                  {fullDetails?.textData?.[symbol]?.WhitePaper?.Link ? (
                    <a href={fullDetails.textData[symbol].WhitePaper.Link} target="_blank" rel="noreferrer">
                      View
                    </a>
                  ) : 'N/A'}
                </td>
                </tr>
                <tr>
                <th>Monetary Symbol </th>
                <td>{symbol ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Market </th>
                <td>{fullDetails?.numbers?.[symbol]?.USD?.MARKET ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Last Transaction </th>
                <td>{fullDetails?.numbers?.[symbol]?.USD?.LASTUPDATE ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Last Transaction Value</th>
                <td>{fullDetails?.numbers?.[symbol]?.USD?.PRICE ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Volume </th>
                <td>{fullDetails?.numbers?.[symbol]?.USD?.VOLUME24HOURTO ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Today's Open Price </th>
                <td>{fullDetails?.numbers?.[symbol]?.USD?.OPEN24HOUR ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Highest Price during the Day </th>
                <td>{fullDetails?.numbers?.[symbol]?.USD?.HIGH24HOUR ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Lowest Price during the Day </th>
                <td>{fullDetails?.numbers?.[symbol]?.USD?.LOW24HOUR ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Change from Previous Day </th>
                <td>{fullDetails?.numbers?.[symbol]?.USD?.CHANGE24HOUR ?? 'N/A'}</td>
                </tr>
                <tr>
                <th>Market Cap </th>
                <td>{fullDetails?.numbers?.[symbol]?.USD?.MKTCAP ?? 'N/A'}</td>
                </tr>
            </tbody>
            </table>

            <CoinChart symbol={symbol} market={fullDetails?.numbers?.[symbol]?.USD?.MARKET ?? ''} />
        </div>
    );
}

export default CoinDetail;