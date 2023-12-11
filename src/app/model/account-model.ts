import { Password } from "primeng/password";

export interface Account {
    id?: number;
    email: string;
    password: Password;
    isBlocked: boolean;
    profilePictureUrl: string;

}
