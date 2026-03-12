export function investment(price: number, qty: number) {
  return price * qty
}

export function presentValue(cmp: number, qty: number) {
  return cmp * qty
}

export function gainLoss(present: number, investment: number) {
  return present - investment
}