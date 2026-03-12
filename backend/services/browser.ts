import puppeteer from "puppeteer-core"

let browser: puppeteer.Browser | null = null

export async function getBrowser() {

  if (!browser) {

    browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: true
    })

  }

  return browser

}