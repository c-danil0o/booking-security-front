import {Address} from "../model/address-model";
import {Host} from "../model/host-model";
import {AccommodationStatus} from "../model/accommodation-status-model";

const address: Address = {street: 'adad', city: 'dad', number: '123', country: 'adas', latitude: 2, longitude:2};
const host: Host = {id:1, address: address, isBlocked: false, email: 'fsdfs' ,firstName: 'dasd', lastName: 'fsdsdf', phone: '123345', properties: [], hostReviews: []};
const mockAccommodation = {
  id: 1,
  name: 'kumova soba',
  description: 'lepa',
  amenities: [],
  accommodationType: 'Room',
  maxGuests: 4,
  minGuests: 2,
  photos: [],
  pricePerGuest: false,
  cancellationDeadline: 7,
  autoApproval: true,
  averageGrade: 4,
  status: AccommodationStatus.Active,
  roomNumber: 9,
  reviews: [],
  address:
  address,
  host: host ,
  availability: []}


export {mockAccommodation}
