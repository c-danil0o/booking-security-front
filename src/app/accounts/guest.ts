import { Password } from "primeng/password";
import { Account } from "./account";
import { Address } from "../address";

export class Guest extends Account {
    firstName: string;
    lastName: string;
    phone: string;
    timesCancelled: number;
    address: Address;
    country: string;
    // favorites: Array<Accommodation>;

    constructor(id: number, email: string, password: Password, isBlocked: boolean, profilePictureUrl: string, firstName: string, lastName: string, phone: string, timesCancelled: number, address: Address, country: string) {
        super(id, email, password, isBlocked, profilePictureUrl);
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.timesCancelled = timesCancelled;
        this.address = address;
        this.country = country;
    }
}