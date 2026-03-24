import { ROOMS } from "../services/api";
import { WEEKDAYS } from "../utils/dateUtils";
import type { ReservationForm as FormData } from "../types";

interface ReservationFormProps {
  form: FormData;
  onFormChange: (updates: Partial<FormData>) => void;
  onPreview: () => void;
  isLoggedIn: boolean;
}

export function ReservationForm({
  form,
  onFormChange,
  onPreview,
  isLoggedIn,
}: ReservationFormProps) {
  const toggleWeekday = (dayId: number) => {
    const newWeekdays = form.weekdays.includes(dayId)
      ? form.weekdays.filter((d) => d !== dayId)
      : [...form.weekdays, dayId].sort((a, b) => a - b);
    onFormChange({ weekdays: newWeekdays });
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 30];

  return (
    <div className="reservation-form">
      <h3>예약 설정</h3>

      <div className="form-section">
        <h4>날짜 범위</h4>
        <div className="form-row-inline">
          <div className="form-field">
            <label>시작일</label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => onFormChange({ startDate: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label>종료일</label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => onFormChange({ endDate: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h4>요일 선택</h4>
        <div className="weekday-buttons">
          {WEEKDAYS.map((day) => (
            <button
              key={day.id}
              className={`weekday-btn ${form.weekdays.includes(day.id) ? "selected" : ""}`}
              onClick={() => toggleWeekday(day.id)}
            >
              {day.short}
            </button>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h4>시간</h4>
        <div className="form-row-inline">
          <div className="form-field">
            <label>시작</label>
            <div className="time-select">
              <select
                value={form.startHour}
                onChange={(e) => onFormChange({ startHour: parseInt(e.target.value) })}
              >
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span>:</span>
              <select
                value={form.startMinute}
                onChange={(e) => onFormChange({ startMinute: parseInt(e.target.value) })}
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {m.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-field">
            <label>종료</label>
            <div className="time-select">
              <select
                value={form.endHour}
                onChange={(e) => onFormChange({ endHour: parseInt(e.target.value) })}
              >
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span>:</span>
              <select
                value={form.endMinute}
                onChange={(e) => onFormChange({ endMinute: parseInt(e.target.value) })}
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {m.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h4>회의실</h4>
        <div className="room-group">
          <label className="room-group-label">6층</label>
          <div className="room-buttons">
            {ROOMS.filter((r) => r.floor === 6).map((room) => (
              <button
                key={room.id}
                className={`room-btn ${form.room === room.id ? "selected" : ""}`}
                onClick={() => onFormChange({ room: room.id })}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>
        <div className="room-group">
          <label className="room-group-label">7층</label>
          <div className="room-buttons">
            {ROOMS.filter((r) => r.floor === 7).map((room) => (
              <button
                key={room.id}
                className={`room-btn ${form.room === room.id ? "selected" : ""}`}
                onClick={() => onFormChange({ room: room.id })}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h4>반복 주기</h4>
        <div className="frequency-buttons">
          <button
            className={`freq-btn ${form.frequency === "weekly" ? "selected" : ""}`}
            onClick={() => onFormChange({ frequency: "weekly" })}
          >
            매주
          </button>
          <button
            className={`freq-btn ${form.frequency === "biweekly" ? "selected" : ""}`}
            onClick={() => onFormChange({ frequency: "biweekly" })}
          >
            격주
          </button>
        </div>
      </div>

      <button
        className="preview-button"
        onClick={onPreview}
        disabled={!isLoggedIn || form.weekdays.length === 0 || !form.room}
      >
        예약 목록 확인
      </button>
    </div>
  );
}
