import { IShiftStore, types } from './types'
import { IShift } from '~/models/IShift'

const actions = {
  create: ({ commit }: {commit: any}, item:IShift):void => {
    const id = Math.floor(Math.random() * 100)
    commit(types.SET_CREATED, { ...item, id })
  },
  update: ({ commit }: {commit: any}, { id, credentials }: {id: string, credentials: IShift}):void => {
    commit(types.SET_UPDATED, { id, credentials })
  },
  delete: ({ commit }: {commit: any}, id :string):void => {
    commit(types.SET_DELETED, id)
  }
}

const mutations = {
  [types.SET_CREATED]: (state: IShiftStore, item: IShift) => {
    state.allShifts.push(item)
  },
  [types.SET_UPDATED]: (state: IShiftStore, { id, credentials }: {id: string, credentials: IShift}) => {
    const index = state.allShifts.findIndex(shift => shift.id === id)
    state.allShifts.splice(index, 1, credentials)
  },
  [types.SET_DELETED]: (state: IShiftStore, id: string): void => {
    const index = state.allShifts.findIndex(shift => shift.id === id)
    state.allShifts.splice(index, 1)
  }
}

const state = () => (
  {
    allShifts: []
  }
)
const getters = {
  allShifts: (state: IShiftStore) => state.allShifts
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
