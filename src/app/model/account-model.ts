import { Password } from "primeng/password";

export interface Account {
    id?: number;
    email: string;
   // password: string;
    isBlocked: boolean;
    profilePictureUrl: string;

}
