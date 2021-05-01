import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [villany, setVillany] = useState(false);
  const [villany1, setVillany1] = useState(false);
  const [villany2, setVillany2] = useState(false);
  const [villany3, setVillany3] = useState(false);
  const [eltelt, setEltelt] = useState(null);

  useEffect(() => {
    console.log(villany1);
    if (villany1) {
      setTimeout(() => setVillany1(false), 1000);
    }
  }, [villany1]);

  useEffect(() => {
    const villan = setInterval(() => setVillany2(!villany2), 500);
    return () => {
      clearInterval(villan);
    };
  }, [villany2]);

  useEffect(() => {
    if (villany3) {
      setTimeout(() => setVillany3(false), 2000);
    }
  }, [villany3]);

  return (
    <div className="container">
      <div className="row">
        <div
          className={`col ${
            villany ? "szoba lekapcsolt" : "szoba felkapcsolt"
          }`}
        >
          <button
            className={`${
              villany ? "szoba lekapcsoltbutton" : "szoba felkapcsoltbutton"
            }`}
            value={villany}
            onClick={() => setVillany(!villany)}
          >
            Villanykapcsoló
          </button>
        </div>

        <div
          className={`col ${
            villany1 ? "szoba1 lekapcsolt" : "szoba1 felkapcsolt"
          }`}
        >
          <button
            className={`${
              villany1 ? "szoba1 lekapcsoltbutton" : "szoba1 felkapcsoltbutton"
            }`}
            value={villany1}
            onClick={() => setVillany1(!villany1)}
          >
            Villanykapcsoló
          </button>
        </div>
      </div>

      <div className="row">
        <div
          className={`col ${
            villany2 ? "szoba2 lekapcsolt" : "szoba felkapcsolt"
          }`}
        >
          <button
            className={`${
              villany2 ? "szoba2 lekapcsoltbutton" : "szoba2 felkapcsoltbutton"
            }`}
            value={villany2}
          >
            Villanykapcsoló
          </button>
        </div>

        <div
          className={`col ${
            villany3 ? "szoba3 lekapcsolt" : "szoba felkapcsolt"
          }`}
        >
          <button
            className={`${
              villany3 ? "szoba3 lekapcsoltbutton" : "szoba3 felkapcsoltbutton"
            }`}
            value={villany3}
            onMouseMove={() => setVillany3(true)}
          >
            Villanykapcsoló
          </button>
        </div>
      </div>
    </div>
  );
}
