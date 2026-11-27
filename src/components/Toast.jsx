function Toast({ message, type }) {
  if (!message) return null;

  return (
    <div className={`toast-message ${type}`}>
      <span className="toast-icon">
        {type === "success" ? "✓" : "!"}
      </span>
      <span>{message}</span>
    </div>
  );
}

export default Toast;