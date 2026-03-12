import { useMemo } from "react"
import styles from "../style/portfolioTable.module.css"

export default function PortfolioTable({ stocks }: any) {
    function num(v: any) {
        const n = Number(v)
        return Number.isFinite(n) ? n : 0
    }
    const totalInvestment = useMemo(() => {
        return stocks.reduce((sum: number, s: any) => {
            if (!s.Qty || !s["Purchase Price"]) return sum
            return sum + (s["Purchase Price"] * s.Qty)
        }, 0)
    }, [stocks])

    let sectorInvestment = 0
    let sectorPresentValue = 0
    let sectorGainLoss = 0

    return (

        <table className={styles.table}>

            <thead className={styles.header}>
                <tr>
                    <th>Stock</th>
                    <th>Purchase Price</th>
                    <th>Qty</th>
                    <th>Investment</th>
                    <th>Portfolio %</th>
                    <th>CMP</th>
                    <th>Present Value</th>
                    <th>Gain/Loss</th>
                    <th>P/E</th>
                    <th>Earnings</th>
                </tr>
            </thead>

            <tbody>

                {stocks.map((stock: any, i: number) => {

                    const isSectorRow =
                        !stock.Qty && !stock["Purchase Price"]

                    // If a new sector starts, reset sector totals
                    if (isSectorRow) {

                        sectorInvestment = 0
                        sectorPresentValue = 0
                        sectorGainLoss = 0

                        return (
                            <tr key={i} className={styles.sectorRow}>
                                <td colSpan={10}>{stock.Particulars}</td>
                            </tr>
                        )
                    }

                    const investment =
                        num(stock["Purchase Price"]) * num(stock.Qty)

                    const presentValue =
                        num(stock.CMP) * num(stock.Qty)

                    const gainLoss =
                        num(presentValue) - num(investment)

                    const portfolioPercent =
                        num(totalInvestment) > 0
                            ? (num(investment) / num(totalInvestment)) * 100
                            : 0

                    sectorInvestment += num(investment)
                    sectorPresentValue += num(presentValue)
                    sectorGainLoss += num(gainLoss)

                    const nextRow = stocks[i + 1]
                    const nextIsSector =
                        nextRow &&
                        (!nextRow.Qty && !nextRow["Purchase Price"])

                    const isLastRow = i === stocks.length - 1

                    return (
                        <>
                            <tr key={i} className={styles.row}>

                                <td>{stock.Particulars}</td>

                                <td>{stock["Purchase Price"]}</td>

                                <td>{stock.Qty}</td>

                                <td>{investment.toFixed(2)}</td>

                                <td>{portfolioPercent.toFixed(2)}%</td>

                                <td>{stock.cmp ?? stock.CMP ?? 0}</td>

                                <td>{presentValue.toFixed(2) ?? 0}</td>
                                <td
                                    className={
                                        gainLoss >= 0
                                            ? styles.gain
                                            : styles.loss
                                    }
                                >
                                    {gainLoss.toFixed(2)}
                                </td>

                                <td>{num(stock.pe ?? stock["P/E (TTM)"])}</td>

                                <td>{num(stock.earnings ?? stock["Latest Earnings"])}</td>

                            </tr>

                            {(nextIsSector || isLastRow) && (

                                <tr className={styles.sectorSummary}>
                                    <td colSpan={10}>

                                        Sector Investment: {sectorInvestment.toFixed(2)} |
                                        Present Value: {sectorPresentValue.toFixed(2)} |
                                        Gain/Loss:

                                        <span
                                            className={
                                                sectorGainLoss >= 0
                                                    ? styles.gain
                                                    : styles.loss
                                            }
                                        >
                                            {" "}{sectorGainLoss.toFixed(2)}
                                        </span>

                                    </td>
                                </tr>

                            )}
                        </>
                    )
                })}

            </tbody>

        </table>

    )
}