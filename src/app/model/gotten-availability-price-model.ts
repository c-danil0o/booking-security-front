import { LocalDateTime } from "@js-joda/core";
import { Password } from "primeng/password";

export interface GottenAvailabilityPrice {
    available: boolean;
    pricePerNight: number;
    totalPrice: number;
}
