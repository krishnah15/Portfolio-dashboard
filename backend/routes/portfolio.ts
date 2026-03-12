import { Router } from "express"
import { readPortfolio } from "../services/excel.js"

const router = Router()

router.get("/", (req, res) => {
  const data = readPortfolio()
  res.json(data)
})

export default router