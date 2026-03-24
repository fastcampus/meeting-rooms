import type { Frequency, ReservationDate } from "../utils/dateUtils";

export interface ReservationForm {
  email: string;
  password: string;
  startDate: string;
  endDate: string;
  weekdays: number[];
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  room: string;
  frequency: Frequency;
}

export interface ReservationResult {
  date: ReservationDate;
  success: boolean;
  message?: string;
}

export type AppStep = "form" | "preview" | "processing" | "complete";
