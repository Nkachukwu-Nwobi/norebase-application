import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../buttons/Button";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import {
  RiMoneyDollarCircleLine,
  RiMoneyEuroCircleLine,
  RiBitCoinLine,
  RiMoneyPoundCircleLine,
  RiMoneyRupeeCircleLine,
} from "react-icons/ri";
import {
  TbCurrencySolana,
  TbCurrencyDogecoin,
  TbCurrencyEthereum,
} from "react-icons/tb";
import Loading from "../loading/Loading";
import "./cointable.css";

function CoinTable() {
  // declaration of states variables
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  // function to fetch data from API call

  const fetchdata = async () => {
    try {
      //fetching of data from the API
      const response = await axios.get(
        `https://api.coinlore.net/api/tickers/?start=${
          page * limit
        }&limit=${limit}`
      );

      // Update coins state with data from the API
      setCoins(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      // set loading to false after data has been fetched
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  // function to handle the previous button

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // function to handle the next button

  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(true);
    fetchdata();
  }, [page, limit]);

  return (
    <>
      <main className="table">

        {/* banner section */}

        <div className="header">
          <h1>
            {<TbCurrencySolana />}
            {<RiBitCoinLine />}
            {<RiMoneyDollarCircleLine />}
            {<RiMoneyPoundCircleLine />} NOREBASE{<RiMoneyEuroCircleLine />}
            {<RiMoneyRupeeCircleLine />}
            {<TbCurrencyEthereum />}
            {<TbCurrencyDogecoin />}
          </h1>
        </div>

        {/* table section */}

        {loading ? (
          <Loading />
        ) : (
          <div>
            <section className="table-container">
              <table>
                {/* table head */}
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Coin</th>
                    <th>Code</th>
                    <th>Price</th>
                    <th>Total Supply</th>
                  </tr>
                  <tr>
                    <div className="limit-filter">
                      <h5>SORT:</h5>
                      <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        name="limit"
                        id="limit"
                      >
                        <option value=""></option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                  </tr>
                </thead>
                  
                {/* table body */}
                <tbody>
                  {coins.map((coin, index) => {
                    return (
                      <tr
                        key={coin.id}
                        className={index % 2 > 0 ? "odd-row" : ""}
                      >
                        <td>{page * limit + index + 1}</td>
                        <td>{coin.name}</td>
                        <td>{coin.symbol}</td>
                        <td>{coin.price_usd}</td>
                        <td>{coin.tsupply + " " + coin.symbol}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>

            {/* pagination implementation */}
            <section className="btn-section">
              {page > 0 ? (
                <Button
                  text="Previous"
                  icon={<HiArrowNarrowLeft />}
                  alt="previous button"
                  classname="prev-btn"
                  onClick={handlePrev}
                />
              ) : (
                <div></div>
              )}

              <Button
                text="Next"
                icon={<HiArrowNarrowRight />}
                alt="next button"
                classname="next-btn"
                onClick={handleNext}
              />
            </section>

          </div>
        )}

      </main>
    </>
  );
}

export default CoinTable;
