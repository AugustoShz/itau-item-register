interface IItem {
  id: string
  name: string
  unit: Units
  amount: number
  currency: string
  value: number
  isPerishable: boolean
  manufacturingDate: Date
  expirationDate: Date
}