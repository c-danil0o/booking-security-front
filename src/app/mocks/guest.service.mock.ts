import {Guest} from "../model/guest-model";

const mockGuest2: Guest = {
  firstName: 'Guest',
  lastName: 'Two',
  id: 2,
  email: 'guest2@example.com',
  address: {
    street: 'Street',
    number: '2',
    country: 'Bosnia',
    city: 'City 3'
  },
  phone: '123456780',
  isBlocked: false,
  timesCancelled: 2,
  favorites: []
}
const editedGuest: Guest = {
  firstName: 'Gues333t',
  lastName: 'Two2',
  id: 2,
  email: 'gost2@example.com',
  address: {
    street: 'Street',
    number: '2',
    country: 'Serbia',
    city: 'City 3'
  },
  phone: '123456780',
  isBlocked: false,
  timesCancelled: 2,
  favorites: []
}
export {editedGuest, mockGuest2}
