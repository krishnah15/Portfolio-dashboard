import axios from "axios"

export async function getStockData(symbol: string) {

  const ticker = symbol.includes(".") ? symbol : `${symbol}.NS`

  try {

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`

    const res = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    })

    const meta = res.data?.chart?.result?.[0]?.meta
    console.log(meta?.regularMarketPrice,"meta")
    return {
      cmp: meta?.regularMarketPrice ?? null
    }

  } catch {

    return { cmp: null }

  }

}