import { Address } from "./address-model";


export interface NewAccount {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  role: string
  address: Address
}
