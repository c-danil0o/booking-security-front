import {Address} from "./address-model";


export interface NewAccount{
  email: string,
  password: string,
  firstName: string;
  lastName: string;
  phone: string;
  role: string
  address: Address
}
