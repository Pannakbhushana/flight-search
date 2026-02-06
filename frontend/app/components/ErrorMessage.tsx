type ErrorMessageProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
};

export default function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
  fullScreen = false,
}: ErrorMessageProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center gap-3 h-screen ${
        fullScreen ? "min-h-screen" : ""
      }`}
    >

      <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100">
        <span className="text-red-600 text-2xl font-bold">!</span>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

      <p className="text-sm text-gray-500 max-w-sm">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
