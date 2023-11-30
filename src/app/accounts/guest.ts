import { Password } from "primeng/password";
import { Account } from "./account";

export class Guest extends Account {
    firstName: string;
    lastName: string;
    phone: string;
    timesCancelled: number;
    // favorites: Array<Accommodation>;

    constructor(id: number, email: string, password: Password, isBlocked: boolean, profilePictureUrl: string, firstName: string, lastName: string, phone: string, timesCancelled: number) {
        super(id, email, password, isBlocked, profilePictureUrl);
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.timesCancelled = timesCancelled;
    }
}