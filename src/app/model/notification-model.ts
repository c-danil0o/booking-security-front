import {User} from "./user-model";

export interface Notification{
  id: number;
  message: string;
  date: Date;
  receiver: number;
}
