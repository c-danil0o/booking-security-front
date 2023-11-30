import { Guest } from "../accounts/guest";

export class Review {
    grade: number;
    comment: string;
    author: Guest;
    approved: boolean;
    
    constructor(grade: number, comment: string, author: Guest, approved: boolean) {
        this.grade = grade;
        this.comment = comment;
        this.author = author;
        this.approved = approved;
    }
}
