interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onLogin: () => Promise<void>;
  onLogout: () => void;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  loginError: string | null;
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onLogout,
  isLoggedIn,
  isLoggingIn,
  loginError,
}: LoginFormProps) {
  if (isLoggedIn) {
    return (
      <div className="login-success">
        <span className="check-icon">✓</span>
        <span>로그인됨: {email}</span>
        <button type="button" onClick={onLogout} className="logout-button">
          로그아웃
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggingIn && email && password) {
      onLogin();
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3>FastFive 로그인</h3>
      <div className="form-row">
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="email@example.com"
          disabled={isLoggingIn}
        />
      </div>
      <div className="form-row">
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="비밀번호"
          disabled={isLoggingIn}
        />
      </div>
      {loginError && <div className="error-message">{loginError}</div>}
      <button
        type="submit"
        disabled={isLoggingIn || !email || !password}
        className="login-button"
      >
        {isLoggingIn ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
