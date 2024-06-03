const falseValues = [false, "false", "", 0]
const trulyValues = [true, "true", 1]

function toReadableBoolean(value: any) {
  if(trulyValues.includes(value)) return 'Sim'
  else return 'Não'
}

function toLocaleNumber (value: number, currency?: string, minimumFractionDigits?: number) {
  return value.toLocaleString('pt-br',{
    minimumFractionDigits,
    style: currency ? 'currency' : undefined, 
    currency
  });
}

export {
  toReadableBoolean,
  toLocaleNumber
}