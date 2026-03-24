import type { ReservationResult } from "../types";
import type { ReservationDate } from "../utils/dateUtils";

interface ProcessingViewProps {
  dates: ReservationDate[];
  results: ReservationResult[];
  currentIndex: number;
  isComplete: boolean;
  onDone: () => void;
}

export function ProcessingView({
  dates,
  results,
  currentIndex: _currentIndex,
  isComplete,
  onDone,
}: ProcessingViewProps) {
  void _currentIndex;
  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;
  const progress = Math.round((results.length / dates.length) * 100);

  return (
    <div className="processing-view">
      <h3>{isComplete ? "예약 완료" : "예약 진행 중..."}</h3>

      {!isComplete && (
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-text">
            {results.length} / {dates.length} ({progress}%)
          </div>
        </div>
      )}

      <div className="results-summary">
        <div className="summary-badge success">
          <span className="count">{successCount}</span>
          <span className="label">성공</span>
        </div>
        <div className="summary-badge fail">
          <span className="count">{failCount}</span>
          <span className="label">실패</span>
        </div>
      </div>

      <div className="results-list">
        {results.map((result) => (
          <div
            key={result.date.dateStr}
            className={`result-item ${result.success ? "success" : "fail"}`}
          >
            <span className="status-icon">{result.success ? "✓" : "✗"}</span>
            <span className="date">{result.date.dateStr}</span>
            <span className="weekday">({result.date.weekdayName})</span>
            {!result.success && result.message && (
              <span className="error-msg">{result.message}</span>
            )}
          </div>
        ))}
      </div>

      {isComplete && (
        <button className="done-button" onClick={onDone}>
          완료
        </button>
      )}
    </div>
  );
}
