import {LocalDateTime} from "@js-joda/core";

export interface Report{
  id: number;
  reason: string;
  authorId: number;
  reportedUserId: number;
  date: Date;
}
