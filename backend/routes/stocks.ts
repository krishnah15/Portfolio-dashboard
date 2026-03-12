import { Router } from "express"
import { getStockData } from "../services/yahoo.js"
import { getGoogleData } from "../services/google.js"

const router = Router()

router.get("/:symbol", async (req, res) => {

  const symbol = req.params.symbol

  if (!symbol) {
    return res.json({
      cmp: null,
      pe: null,
      earnings: null
    })
  }

  try {

    const [yahoo, google] = await Promise.all([
      getStockData(symbol),
      getGoogleData(symbol)
    ])

    res.json({
      cmp: yahoo?.cmp ?? null,
      pe: google?.pe ?? null,
      earnings: google?.earnings ?? null
    })

  } catch (err) {

    console.log(err)

    res.json({
      cmp: null,
      pe: null,
      earnings: null
    })

  }

})

export default router