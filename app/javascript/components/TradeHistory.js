import React, { useEffect, useState } from 'react';
import backendApi from './backendApi';

function TradeHistory() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    backendApi.get('/trades').then((response) => {
      setTrades(response.data.data.reverse());
    });
  }, []);

  return (
    <div className="container">
      <h1 className="cover-heading">Ultimas Trades</h1>
      <div>
        {trades.map((trade, index) => (
          <div className="row" key={index}>
            <div className="col-5">
              {trade.pokemons_group_one.map((pokemon, p1index) => (

                <img src={pokemon.sprite} alt="" key={p1index} />
              ))}
            </div>
            <div className="col-2 text-center p-4">
              <img className="exchangeArrow" src="https://freepngimg.com/thumb/money/48819-5-exchange-png-file-hd.png" alt="" />
            </div>
            <div className="col-5">
              {trade.pokemons_group_two.map((pokemon, p2index) => (

                <img src={pokemon.sprite} alt="" key={p2index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TradeHistory;
