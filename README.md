Portfolio Dashboard - https://portfolio-dashboard-five-rouge.vercel.app/

A dynamic portfolio dashboard built with Next.js, TypeScript, Tailwind/CSS Modules, and Node.js that visualizes stock holdings, calculates portfolio metrics, and fetches live market data.
The application displays portfolio information in a structured table and updates stock prices periodicslly to compute real-time present value and gain/loss.

Features:

Portfolio table displaying holdings
Live CMP (Current Market Price) updates
Automatic Present Value and Gain/Loss calculations
Portfolio percentage allocation
Sector grouping with sector summaries
Gain/Loss visual indicators (green/red)
Periodic data refresh
Error handling for invalid or missing financial data
Responsive UI

Project Structure:

Portfolio-dashboard
│
├── backend
│   ├── routes
│   ├── services
│   ├── server.ts
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── style
│
└── README.md

Clone the repository
git clone https://github.com/your-username/portfolio-dashboard.git
cd portfolio-dashboard

For Backend:
-cd backend
-npm install
-npm run dev

For Frontend:
-cd frontend
-npm install
-npm run dev


For CPM
Endpoint used: https://query1.finance.yahoo.com/v8/finance/chart/{symbol}
Yahoo Finance was chosen because it provides reliable access to stock prices and does not require authentication for chart data.

Google Finance
Used for:
P/E ratio
Latest earnings

Google Finance loads financial metrics dynamically through JavaScript, making it difficult to scrape using standard HTTP requests.
To overcome this limitation, Puppeteer was used to render the page and extract the required financial values.
