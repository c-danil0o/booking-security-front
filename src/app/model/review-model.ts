import {User} from "./user-model";
import {ReviewStatus} from "./review-status-model";


export interface Review {
    id: number;
    grade: number;
    comment: string;
    author: User;
    status: ReviewStatus
    date: Date;
    accommodationId?: number;
    hostId?: number;

}
