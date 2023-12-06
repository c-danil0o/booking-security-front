import { Password } from "primeng/password";
import { Account } from "./account";
import {Address} from "../model/address-model";


export interface Guest extends Account {
    firstName: string;
    lastName: string;
    phone: string;
    timesCancelled: number;
    address: Address;
    country: string;
    // favorites: Array<Accommodation>;


}
