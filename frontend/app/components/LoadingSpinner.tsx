type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
};

export default function LoadingSpinner({
  size = "md",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`flex flex-col items-center gap-2 h-screen justify-center items-center${
        fullScreen ? "min-h-screen" : ""
      }`}
    >
      <div
        className={`animate-spin rounded-full border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
      />

      {text && (
        <p className="text-sm text-gray-500 font-medium">{text}</p>
      )}
    </div>
  );
}
