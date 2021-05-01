import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [balance, setBalance] = useState(0);
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [isSell, setIsSell] = useState(true);
  const [currency, setCurrency] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get(
        "https://api.exchangerate.host/latest?base=huf"
      );
      console.log(response);
      setCurrency(response.data.rates);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addList = (name, price, isSell) => {
    const data = {
      name: name,
      price: price,
      isSell: isSell,
      id: Math.floor(Math.random() * 100000),
    };
    setList([...list, data]);
  };
  const handleSubmit = (e) => {
    e.preventDedault();
    if (!name || !price) {
      return;
    }
  };
  const add = () => {
    addList(name, price, isSell);
    setName("");
    setPrice(0);
    setBalance(
      isSell
        ? parseInt(balance) - parseInt(price)
        : parseInt(balance) + parseInt(price)
    );
  };

  const remove = (id) => {
    const deleted = list.filter((e) => e.id === id);
    const newList = list.filter((e) => e.id !== id);
    setList([...newList]);
    setBalance(
      deleted[0].isSell
        ? parseInt(balance) + parseInt(deleted[0].price)
        : parseInt(balance) - parseInt(deleted[0].price)
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="bemenet m-2 p-2 col">
          {/*<form onSubmit={handleSubmit}>*/}
          <h1>Új Tétel</h1>
          <input
            className="m-2"
            type="text"
            placeholder="Mit vásároltál?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="m-2 p-2">
            <input
              type="number"
              placeholder="Milyen összegben ?"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="radio" name="kidbev">
              Bevétel
            </label>
            <input
              type="radio"
              name="kiadbev"
              id="radio"
              onChange={() => setIsSell(false)}
            />
            <label htmlFor="radio" name="kidbev">
              Kiadás
            </label>
            <input
              type="radio"
              name="kiadbev"
              id="radio"
              onChange={() => setIsSell(true)}
            />
            <button
              type="submit"
              className="btn btn-primary m-2 p-2"
              onClick={add}
            >
              Küldés
            </button>
          </div>
          {/*</form>*/}
        </div>

        <div className="col m-2 p-2 bemenet">
          <h1>Egyenleg</h1>
          <h1
            className={`m-3 ${balance < 0 ? "kiad" : "beve"}`}
          >{`${balance} HUF`}</h1>
          <div className="row">
            {currency !== undefined ? (
              <>
                <h3 className="col">{`${(
                  parseInt(balance) * currency.EUR
                ).toFixed(2)} EUR`}</h3>
                <h3 className="col">{`${(
                  parseInt(balance) * currency.USD
                ).toFixed(2)} USD`}</h3>
                <h3 className="col">{`${(
                  parseInt(balance) * currency.GBP
                ).toFixed(2)} GBP`}</h3>
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
            key={lis.id}
            className={`bemenet m-2 p-2 ${lis.isSell ? "kiad" : "beve"}`}
          >
            <div className="row">
              <div className="col sajat"> {lis.name}</div>
              <div className="col jobbra">
                {lis.price}
                <button
                  className="btn btn-primary m-2"
                  onClick={() => remove(lis.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
