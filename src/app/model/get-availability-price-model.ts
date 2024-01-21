import { LocalDateTime } from "@js-joda/core";
import { Password } from "primeng/password";

export interface GetAvailabilityPrice {
    accommodationId?: number;
    startDate: Date;
    endDate: Date;
    guests: number;
}
