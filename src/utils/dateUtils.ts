import { addDays, getISOWeek, format } from "date-fns";

export const WEEKDAYS = [
  { id: 0, label: "월", short: "월" },
  { id: 1, label: "화", short: "화" },
  { id: 2, label: "수", short: "수" },
  { id: 3, label: "목", short: "목" },
  { id: 4, label: "금", short: "금" },
  { id: 5, label: "토", short: "토" },
  { id: 6, label: "일", short: "일" },
];

export type Frequency = "weekly" | "biweekly";

export interface ReservationDate {
  date: Date;
  dateStr: string;
  weekdayName: string;
}

export function generateDates(
  startDate: Date,
  endDate: Date,
  weekdays: number[],
  frequency: Frequency = "weekly"
): ReservationDate[] {
  const dates: ReservationDate[] = [];
  let current = new Date(startDate);
  let weekCount = 0;
  let lastWeekNum: number | null = null;

  while (current <= endDate) {
    const currentWeekNum = getISOWeek(current);

    if (lastWeekNum === null || currentWeekNum !== lastWeekNum) {
      if (lastWeekNum !== null) {
        weekCount++;
      }
      lastWeekNum = currentWeekNum;
    }

    // Python의 weekday()는 월=0, 일=6
    // JavaScript의 getDay()는 일=0, 토=6
    // 변환: (getDay() + 6) % 7 => 월=0, 일=6
    const jsDay = current.getDay();
    const pythonWeekday = jsDay === 0 ? 6 : jsDay - 1;

    if (weekdays.includes(pythonWeekday)) {
      if (frequency === "weekly" || weekCount % 2 === 0) {
        dates.push({
          date: new Date(current),
          dateStr: format(current, "yyyy-MM-dd"),
          weekdayName: WEEKDAYS[pythonWeekday].label,
        });
      }
    }

    current = addDays(current, 1);
  }

  return dates;
}

export function formatTime(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

export function formatDateTime(date: Date, hour: number, minute: number): string {
  return `${format(date, "yyyy-MM-dd")} ${formatTime(hour, minute)}:00`;
}
