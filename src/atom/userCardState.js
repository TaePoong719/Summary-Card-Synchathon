import { atom } from 'recoil'

export const userCardsState = atom({
  key: 'userCards',
  default: [],
})

export const searchedUserCardsState = atom({
  key: 'searchedUserCardsState',
  default: [],
})
