import { useEffect, useState, useRef } from "react"
import axios from "axios"

export default function usePortfolio() {

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  async function load() {

    try {

      const res = await axios.get("http://localhost:5000/portfolio")

      setData(res.data)

    } catch (err) {
      console.error(err)
    }

    setLoading(false)

  }

  useEffect(() => {

    load()

    if (!intervalRef.current) {

      intervalRef.current = setInterval(load, 15000)

    }

    return () => {

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

    }

  }, [])

  return { data, loading }

}