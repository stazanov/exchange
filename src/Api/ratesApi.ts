import {CurrencyApi} from "../Type/type";

export const fetchInfo = async (): Promise<CurrencyApi[]> => {
  const urlGetData = "https://api.coinlore.net/api/ticker/?id=90,80,518"
  const response = await fetch(urlGetData)
  if (response.status !== 200) throw new Error("Что-то пошло не так! Попробуйте позже")
  return response.json()
}