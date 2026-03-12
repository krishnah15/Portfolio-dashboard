import { useEffect, useState, useRef } from "react"
import axios from "axios"

type PortfolioItem = {
  Particulars?: string
  Qty?: number
  "Purchase Price"?: number
  CMP?: number
  cmp?: number
  pe?: number
  earnings?: number
  Symbols?: string
}

export default function usePortfolio() {

  const [data, setData] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {

    async function load() {

      try {

        const res = await axios.get(
          "https://portfolio-dashboard-4qus.onrender.com/portfolio"
        )

        setData(res.data)

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    load()

    intervalRef.current = setInterval(load, 15000)

    return () => {

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

    }

  }, [])

  return { data, loading }

}