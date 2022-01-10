import { ITime } from './ITime'

export interface IShift{
  id: string
  title: string;
  description?: string;
  dates: Array<ITime> | string[]
}
