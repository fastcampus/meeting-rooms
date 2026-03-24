import { ROOMS } from "../services/api";
import { formatTime } from "../utils/dateUtils";
import type { ReservationDate } from "../utils/dateUtils";

interface PreviewListProps {
  dates: ReservationDate[];
  room: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  onConfirm: () => void;
  onBack: () => void;
}

export function PreviewList({
  dates,
  room,
  startHour,
  startMinute,
  endHour,
  endMinute,
  onConfirm,
  onBack,
}: PreviewListProps) {
  const roomInfo = ROOMS.find((r) => r.id === room);
  const timeRange = `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`;

  return (
    <div className="preview-list">
      <h3>예약 목록 확인</h3>

      <div className="preview-summary">
        <div className="summary-item">
          <span className="label">회의실:</span>
          <span className="value">{roomInfo?.name} (ID: {roomInfo?.spaceId})</span>
        </div>
        <div className="summary-item">
          <span className="label">시간:</span>
          <span className="value">{timeRange}</span>
        </div>
        <div className="summary-item">
          <span className="label">총 예약:</span>
          <span className="value">{dates.length}건</span>
        </div>
      </div>

      <div className="date-list">
        {dates.map((item, index) => (
          <div key={item.dateStr} className="date-item">
            <span className="index">{index + 1}.</span>
            <span className="date">{item.dateStr}</span>
            <span className="weekday">({item.weekdayName})</span>
          </div>
        ))}
      </div>

      <div className="preview-actions">
        <button className="back-button" onClick={onBack}>
          뒤로
        </button>
        <button className="confirm-button" onClick={onConfirm}>
          {dates.length}건 예약하기
        </button>
      </div>
    </div>
  );
}
