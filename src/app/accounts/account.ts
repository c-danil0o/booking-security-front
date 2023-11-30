import { Password } from "primeng/password";

export class Account {
    id: number;
    email: string;
    password: Password;
    isBlocked: boolean;
    profilePictureUrl: string;

    constructor(id: number, email: string, password: Password, isBlocked: boolean, profilePictureUrl: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.isBlocked = isBlocked;
        this.profilePictureUrl = profilePictureUrl;
    }
}
