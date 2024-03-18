import {Dispatch, SetStateAction} from "react";

export interface RateType {
  name: string,
  priceUsd: number
}

export interface SelectType {
  value: string,
  label: string
}

export interface CurrencyType {
  name: string,
  value: number,
  rate: number
}

export interface CurrencyApi {
  csupply: string
  id: string
  market_cap_usd: string
  msupply: string
  name: string
  nameid: string
  percent_change_1h: string
  percent_change_7d: string
  percent_change_24h: string
  price_btc: string
  price_usd: string
  rank: number
  symbol: string
  tsupply: string
  volume24: number
  volume24a: number
}

export interface curListType {
  nameValue?: string,
  setNameValue: Dispatch<SetStateAction<string | undefined>>
}
