import {Host} from "../model/host-model";

const mockHost2: Host = {
  firstName: 'Host',
  lastName: 'Two',
  id: 2,
  email: 'host2@example.com',
  address: {
    street: 'Street',
    number: '12',
    country: 'Bosnia',
    city: 'City 2'
  },
  phone: '12345678',
  isBlocked: false,
}
const editedHost: Host = {
  firstName: 'Hostname',
  lastName: 'Two',
  id: 2,
  email: 'host2@example.com',
  address: {
    street: 'Street 3',
    number: '123',
    country: 'Serbia',
    city: 'City 2'
  },
  phone: '123456789',
  isBlocked: false,
}
export {mockHost2, editedHost}
