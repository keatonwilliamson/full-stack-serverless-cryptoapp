import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify'



function App() {

  const [input, setInput] = useState({ limit: 5, start: 0 });
  const [coins, setCoins] = useState([]);

  async function fetchCoins() {
    const { limit, start } = input
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`)
    setCoins(data.coins)
  }

  function updateInputValues(type, value) {
    setInput({ ...input, [type]: value })
  }

  useEffect(() => {
    fetchCoins()
  }, []);

  return (
    <div className="App">
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit"
      />
      <input
        onChange={e => updateInputValues('start', e.target.value)}
        placeholder="start"
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
};

export default App;
