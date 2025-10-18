/**
 * Toast Notification Component
 */

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastData = {
  id: string;
  message: string;
  type: ToastType;
};

export function Toast({ toast }: { toast: ToastData }) {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "error":
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800";
      case "error":
        return "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800";
      case "info":
      default:
        return "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800";
    }
  };

  return (
    <div
      className={`${getBackgroundColor()} border rounded-lg p-4 shadow-lg backdrop-blur-sm flex items-start gap-3 min-w-[300px] max-w-[400px] animate-slide-in`}
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{toast.message}</p>
      </div>
      <button
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        onClick={() => {
          // TODO: Implement dismiss logic
          console.log("Dismiss toast:", toast.id);
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastContainer({ toasts }: { toasts: ToastData[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <div className="pointer-events-auto">{toasts.map((toast) => Toast({ toast }))}</div>
    </div>
  );
}
