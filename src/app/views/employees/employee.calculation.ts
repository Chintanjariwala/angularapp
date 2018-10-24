export interface Calculation {
   grossSalary:number,
   perHour:number,
   ssn:number,
   medicare:number,
   fica:number,
   health:number,
   vision:number,
   r401k:number,
   preTax:number,
   fedralTax:number,
   takeHomePay:number
}

export let  fedralmethod  = {
  allowances:{
    biweekly: 159.60
  },
  biweekly:{
    Single:{
      thresholds:    [ 142.00, 509.00, 1631.00, 3315.00,  6200.00,  7835.00, 19373.00],
      minimum_taxes: [   0.00,  36.70,  171.34,  541.82,  1234.22,  1757.42,  5795.72],
      percentages:   [  10.00,  12.00,   22.00,   24.00,    32.00,    35.00,    37.00]
    },
    Married:{
      thresholds:    [ 444.00, 1177.00, 3421.00, 6790.00, 12560.00, 15829.00, 23521.00],
      minimum_taxes: [   0.00,   73.30,  342.58, 1083.76,  2468.56,  3514.64,  6206.84],
      percentages:   [  10.00,   12.00,   22.00,   24.00,    32.00,    35.00,    37.00]
    }
  }
}