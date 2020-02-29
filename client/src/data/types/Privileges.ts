import RestType from './RestType'

interface Privileges {
  lv: number
  type: string
  name: string
  description: string
  counter?: number
  counterType?: string
  rest?: RestType
  extra?: any
}
export default Privileges
