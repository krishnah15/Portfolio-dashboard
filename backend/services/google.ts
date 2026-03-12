import { getBrowser } from "./browser.js"

export async function getGoogleData(symbol: string) {

  const browser = await getBrowser()

  const page = await browser.newPage()

  try {

    await page.goto(
      `https://www.google.com/finance/quote/${symbol}:NSE`,
      { waitUntil: "networkidle2" }
    )

    const data = await page.evaluate(() => {

      const rows = Array.from(document.querySelectorAll("div.gyFHrc"))

      let pe = null
      let earnings = null

      rows.forEach(row => {

        const label = row.querySelector(".mfs7Fc")?.textContent?.trim()
        const value = row.querySelector(".P6K39c")?.textContent?.trim()

        if (!label || !value) return

        if (label.includes("P/E ratio")) pe = value

        if (label.includes("EPS")||label.includes("Earnings per share") || label.includes("EPS (TTM)")) earnings = value

      })

      return { pe, earnings }

    })

    return data

  } catch {

    return { pe: null, earnings: null }

  } finally {

    await page.close()

  }

}