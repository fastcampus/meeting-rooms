import { useState, useCallback } from "react";
import { api, ROOM_IDS } from "./services/api";
import { generateDates, formatDateTime } from "./utils/dateUtils";
import type { ReservationDate } from "./utils/dateUtils";
import type { ReservationForm as FormData, ReservationResult, AppStep } from "./types";
import { LoginForm } from "./components/LoginForm";
import { ReservationForm } from "./components/ReservationForm";
import { PreviewList } from "./components/PreviewList";
import { ProcessingView } from "./components/ProcessingView";
import "./App.css";

const getDefaultForm = (): FormData => {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  return {
    email: "",
    password: "",
    startDate: today.toISOString().split("T")[0],
    endDate: nextMonth.toISOString().split("T")[0],
    weekdays: [0, 1, 2, 3], // 월~목
    startHour: 13,
    startMinute: 0,
    endHour: 14,
    endMinute: 0,
    room: "miles",
    frequency: "weekly",
  };
};

function App() {
  const [form, setForm] = useState<FormData>(getDefaultForm());
  const [step, setStep] = useState<AppStep>("form");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [dates, setDates] = useState<ReservationDate[]>([]);
  const [results, setResults] = useState<ReservationResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFormChange = useCallback((updates: Partial<FormData>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleLogin = useCallback(async () => {
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const result = await api.login(form.email, form.password);
      if (result.success) {
        setIsLoggedIn(true);
      } else {
        setLoginError(result.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      setLoginError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoggingIn(false);
    }
  }, [form.email, form.password]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setLoginError(null);
  }, []);

  const handlePreview = useCallback(() => {
    const startDate = new Date(form.startDate);
    const endDate = new Date(form.endDate);
    const generatedDates = generateDates(startDate, endDate, form.weekdays, form.frequency);
    setDates(generatedDates);
    setStep("preview");
  }, [form]);

  const handleConfirm = useCallback(async () => {
    setStep("processing");
    setResults([]);
    setCurrentIndex(0);

    const spaceId = ROOM_IDS[form.room];

    for (let i = 0; i < dates.length; i++) {
      setCurrentIndex(i);
      const date = dates[i];
      const startTime = formatDateTime(date.date, form.startHour, form.startMinute);
      const endTime = formatDateTime(date.date, form.endHour, form.endMinute);

      try {
        const result = await api.reserve(spaceId, startTime, endTime);
        setResults((prev) => [
          ...prev,
          {
            date,
            success: result.success,
            message: result.message || result.error,
          },
        ]);
      } catch (error) {
        setResults((prev) => [
          ...prev,
          {
            date,
            success: false,
            message: "네트워크 오류",
          },
        ]);
      }

      // API 호출 간격
      if (i < dates.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }, [dates, form]);

  const handleDone = useCallback(() => {
    setStep("form");
    setResults([]);
    setDates([]);
  }, []);

  const handleBack = useCallback(() => {
    setStep("form");
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>FastFive 회의실 예약</h1>
        <p>반복 예약을 간편하게</p>
      </header>

      <main className="app-main">
        {step === "form" && (
          <>
            <LoginForm
              email={form.email}
              password={form.password}
              onEmailChange={(email) => handleFormChange({ email })}
              onPasswordChange={(password) => handleFormChange({ password })}
              onLogin={handleLogin}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              isLoggingIn={isLoggingIn}
              loginError={loginError}
            />
            <ReservationForm
              form={form}
              onFormChange={handleFormChange}
              onPreview={handlePreview}
              isLoggedIn={isLoggedIn}
            />
          </>
        )}

        {step === "preview" && (
          <PreviewList
            dates={dates}
            room={form.room}
            startHour={form.startHour}
            startMinute={form.startMinute}
            endHour={form.endHour}
            endMinute={form.endMinute}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}

        {step === "processing" && (
          <ProcessingView
            dates={dates}
            results={results}
            currentIndex={currentIndex}
            isComplete={results.length === dates.length}
            onDone={handleDone}
          />
        )}
      </main>
    </div>
  );
}

export default App;
