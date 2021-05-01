import "./App.css";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [isSell, setIsSell] = useState(true);
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get(
        "https://api.exchangerate.host/latest?base=huf"
      );
      setCurrency(response.data.rates);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addList = (name, price, isSell) => {
    const data = {
      name: name,
      price: price,
      id: uuid(),
      isSell: isSell,
    };
    setList([...list, data]);
  };

  const add = () => {
    if (price || name) {
      addList(name, price, isSell);
      setName("");
      setPrice("");
      setIsSell(true);
      setBalance(
        isSell
          ? parseInt(balance) - parseInt(price)
          : parseInt(balance) + parseInt(price)
      );
    }
  };

  const removeEl = (id) => {
    const newList = list.filter((el) => el.id !== id);
    const deleted = list.filter((el) => el.id === id);
    setList([...newList]);
    setBalance(
      deleted[0].isSell
        ? parseInt(balance) + parseInt(deleted[0].price)
        : parseInt(balance) - parseInt(deleted[0].price)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const numberformat = (num) => num.toLocaleString().replace(/\,/g, " ");

  return (
    <div className="container">
      <div className="row">
        <div className="col forma">
          <h1>Új Tételek</h1>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Mi a tétel?"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div>
              <input
                placeholder="Mekkora az összeg?"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="bevetel">Bevétel</label>
              <input
                type="radio"
                name="kiadbev"
                id="bevetel"
                onClick={() => setIsSell(false)}
              />
              <label htmlFor="kiadas">Kiadás</label>
              <input
                checked="checked"
                type="radio"
                name="kiadbev"
                id="kiadas"
                onClick={() => setIsSell(true)}
              />
              <button className="btn btn-primary" onClick={add}>
                Küldés
              </button>
            </div>
          </form>
        </div>

        <div className="col forma">
          <h1>Egyenleg</h1>
          <h1 className={`${balance > 0 ? "green" : "red"}`}>{balance}</h1>
          <div className="row">
            {currency !== undefined ? (
              <>
                <h4 className="col">
                  {(parseInt(balance) * currency.EUR).toFixed(2)}EUR
                </h4>
                <h4 className="col">
                  {" "}
                  {(parseInt(balance) * currency.USD).toFixed(2)}USD
                </h4>
                <h4 className="col">
                  {" "}
                  {(parseInt(balance) * currency.GBP).toFixed(2)}GBP
                </h4>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div>
        {list.map((lis) => (
          <div
            className={`row forma ${lis.isSell ? "red" : "green"}`}
            key={lis.id}
          >
            <div className="col-10">{lis.name}</div>
            <div className="col-1">{lis.price}</div>
            <button
              className="btn btn-danger col-1"
              onClick={() => removeEl(lis.id)}
            >
              Törlés
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
