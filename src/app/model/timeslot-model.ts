export interface Timeslot{
  id?: number;
  startDate: Date;
  endDate: Date;
  price: number;
  isOccupied?: boolean;
}
