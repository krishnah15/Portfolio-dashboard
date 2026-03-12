export function groupBySector(stocks: any[]) {
  const sectors: any = {}

  for (let s of stocks) {
    if (!sectors[s.sector]) {
      sectors[s.sector] = []
    }

    sectors[s.sector].push(s)
  }

  return sectors
}

export function sectorTotals(stocks: any[]) {
  let investment = 0
  let present = 0

  for (let s of stocks) {
    investment += s.price * s.quantity
    present += (s.cmp || 0) * s.quantity
  }

  return {
    investment,
    present,
    gain: present - investment
  }
}