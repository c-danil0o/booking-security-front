import { Account } from "../accounts/account";

export class Review {
    grade: number;
    comment: string;
    authorId: number;
    approved: boolean;
    
    constructor(grade: number, comment: string, authorId: number, approved: boolean) {
        this.grade = grade;
        this.comment = comment;
        this.authorId = authorId;
        this.approved = approved;
    }
}
