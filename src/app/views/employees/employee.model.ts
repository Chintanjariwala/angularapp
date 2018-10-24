export interface Employee {
  id:string,
  name: {
  	first: string,
  	last: string
  },
  phone: number,
  email: string,
  age: number,
  imagePath: string,
  baseSalary: number,
  marital_status: string,
  fedral_allowances: number,
  health_insurance: number,
  vision_insurance: number,
  retirement_401k: number
}