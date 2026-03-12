import usePortfolio from "../hooks/usePortfolio"
import PortfolioTable from "../components/PortfolioTable"

export default function Home() {

    const { data, loading } = usePortfolio()

    return (
        <div className="p-10">

            <h1 className="text-3xl mb-8">
                Portfolio Dashboard
            </h1>

            {loading ? (
                <p className="text-gray-500 animate-pulse">
                    Loading market data...
                </p>
            ) : (
                <PortfolioTable stocks={data} />
            )}

        </div>
    )
}