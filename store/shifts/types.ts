import { IShift } from './../../models/IShift'
export enum types{
  SET_CREATED = 'SET_CREATED',
  SET_UPDATED = 'SET_UPDATED',
  SET_DELETED = 'SET_DELETED'
}

export interface IShiftStore {
  allShifts :Array<IShift>
}
