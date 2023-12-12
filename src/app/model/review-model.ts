import {User} from "./user-model";


export interface Review {
    id: number;
    grade: number;
    comment: string;
    author: User;
    approved: boolean;

}
