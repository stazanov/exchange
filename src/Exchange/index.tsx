import React, { useEffect, useState } from "react";
import Select from "react-select";
import LoadingComponent from "../LoadingComponent";
import { curListType, CurrencyType, RateType, SelectType } from "../Type/type";
import { fetchInfo } from "../Api/ratesApi";
import s from "./ExchangeStyle.module.css";
import Form from "react-bootstrap/Form";

export const Index = () => {
  const [rates, setRates] = useState<RateType[]>([]);
  const [currency, setCurrency] = useState<CurrencyType>();
  const [currencyList, setCurrencyList] = useState<SelectType[]>([]);
  const [currencyFirst, setCurrencyFirst] = useState<string>();
  const [currencySecond, setCurrencySecond] = useState<string>();
  const currentTime = new Date().toLocaleTimeString().slice(0, 5);
  const currentDate = new Date().toLocaleDateString();
  const proportion =
    Math.round(
      ((rates.find((cur) => cur.name === currencyFirst)?.priceUsd || 1) /
        (rates.find((cur) => cur.name === currencySecond)?.priceUsd || 1)) *
        100,
    ) / 100;

  useEffect(() => {
    fetchInfo()
      .then((data) => {
        setRates(
          data.map((currency) => ({
            name: currency.symbol,
            priceUsd: Number(currency.price_usd),
          })),
        );
        setCurrencyList(
          data.map((currency) => ({
            value: currency.symbol,
            label: currency.symbol,
          })),
        );
        setCurrency({
          name: data[0].symbol,
          value: 0,
          rate: Number(data[0].price_usd),
        });
        setCurrencyFirst(data[0].symbol);
        setCurrencySecond(data[0].symbol);
      })
      .catch((err) => alert("Что-то пошло не так! Попробуйте позже"));
  }, []);

  const handleValue = (name?: string) => {
    if (name === currency?.name) return currency?.value;
    else {
      let rateValue: number | undefined = rates.find(
        (rate) => rate.name === name,
      )?.priceUsd;
      if (currency && rateValue)
        return (
          Math.round(((currency.value * currency.rate) / rateValue) * 10000) /
          10000
        );
    }
  };

  const onChange = (value: number, name: string) => {
    setCurrency({
      name: name,
      value: value,
      rate: rates.find((rate) => rate.name === name)?.priceUsd || 0,
    });
  };

  const curList: curListType[] = [
    {
      nameValue: currencyFirst,
      setNameValue: setCurrencyFirst,
    },
    {
      nameValue: currencySecond,
      setNameValue: setCurrencySecond,
    },
  ];

  return (
    <div className={s.total}>
      <div className={s.title}>Конвертер валют</div>
      {currency ? (
        <>
          <div className={s.middleBlock}>
            {curList.map((cur, index) => (
              <div
                key={index}
                className={s.item}
                style={{ marginBottom: "12px" }}
              >
                <Select
                  name={`${cur.nameValue}Type`}
                  options={currencyList}
                  value={currencyList.find((c) => c.value === cur.nameValue)}
                  onChange={(e) => e && cur.setNameValue(e.value)}
                  className={s.selectStyle}
                />
                <Form.Control
                  type="number"
                  size="lg"
                  className={s.inputStyle}
                  min={0}
                  name={cur.nameValue}
                  value={handleValue(cur.nameValue)}
                  onChange={(e) =>
                    e && onChange(Number(e.target.value), cur.nameValue || "")
                  }
                />
              </div>
            ))}
            <div>{`1 ${currencyFirst} = ${proportion} ${currencySecond}`}</div>
          </div>
          <div className={s.footer}>
            {`Данные носят ознакомительный характер на ${currentDate} ${currentTime}`}
          </div>
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};
