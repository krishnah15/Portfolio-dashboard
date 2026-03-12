import XLSX from "xlsx"

export function readPortfolio() {
  const workbook = XLSX.readFile("./portfolio.xlsx")

  const sheetName = workbook.SheetNames[0]
  if (!sheetName) return []

  const sheet = workbook.Sheets[sheetName]
  if (!sheet) return []

  const rows = XLSX.utils.sheet_to_json(sheet, {
    range: 1
  })

  return rows
}