import {Account} from "./account-model";
import {Address} from "./address-model";
import {Accommodation} from "./accommodation-model";
import {Review} from "./review-model";

export interface Host extends Account {
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
  properties: Accommodation[];
  hostReviews: Review[];


}
