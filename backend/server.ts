import express from "express"
import cors from "cors"
import portfolioRoutes from "./routes/portfolio.js"
import stockRoutes from "./routes/stocks.js"
const app = express()

app.use(cors())
app.use(express.json())

app.use("/portfolio", portfolioRoutes)
app.use("/stocks", stockRoutes)

app.listen(5000, () => {
  console.log("server running")
})